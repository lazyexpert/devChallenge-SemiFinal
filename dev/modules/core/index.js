const path = require('path'),
      fs = require('fs'),
      cp = require('child_process'),
      timezone = require('./timezone')

// Central application dispatcher
// Serves all logic
var core = {
  init : function(app, logger) {
    this.db = require('./db')
    this.db.core = this

    this.app = app
    this.logger = logger
    app.core = this

    this.orderTypes = []
    this.reportHandlers = []


    this.launchInterval()


    /* Register new order Type */
    this.regOrderType({
      name : "Пицца",
      spell : [ /пицца/, /пиццу/, /пиццы/ ],
      places : []
    })

    /* Register new order place */
    this.regOrderPlace({
      type : "Пицца",
      name : "Мамамия",
      url  : "http://mamamia.ua/",
      spell: [ /мамма мия/, /mamma mia/, /mammamia/, /маммамия/, /мама мия/, /mama mia/, /мама мне/, /мама миа/ ],
      deliveryDelay: 1000*60*60*4,
      menu : "./menu/mammamia.js",
      behavior: `${global.behaviorFolder}/mammamia.js`
    })

    /*
      Scalable register report handler
      For such interface handler is a function with one argument : object-order
      You may implement db storage, file storage, console log spam... whatever
      There can be several handlers
    */
    this.regReportHandler( order => this.logger.log(`Reporting: finished order execution. ID ${order.id}`))
  },

  regReportHandler : function(fn){
    core.logger.log("Зарегистрирован новый обработчик отчетов.")
    this.reportHandlers.push(fn)
  },

  // One minute interval checks for immediate orders execution
  // You can set heartbeat rate higher, if its necessary in env.js module
  launchInterval : function() {
    this.interval = setInterval(function() {
      this.db.getClosestQueueItem( function(docs) {
        if( docs.length ) {
          let order = docs[0],
              time = timezone.offset(new Date(), 3)

          if(time.getTime() >= order.executionTime ) {
            order.order = JSON.parse(order.order)
            this.logger.log(`Сердцебиение очереди: пришло время для выполнения отложенного заказа. ID: ${order.id}.`)

            this.executeOrder(order)

            this.db.deleteItemFromQueue(order.id,
              data => this.logger.log(`Удален заказ. ID: ${order.id}. Причина: отправлен на выполнение.`))

            this.report(order)
          } else {
            this.logger.log(`Сердцебиение очереди: пока не пришло время что-либо выполнять. Подождем...`)
          }
        } else this.logger.log(`Сердцебиение очереди: пока нет очереди на выполнение. Добавьте заказ, станет веселее.`)
      }.bind(this))
    }.bind(this), global.heartBeatRate)
  },

  // Method is reporting succesfull order execution
  report : function(order) {
    if( !this.reportHandlers.length )
      this.logger.err("Ядро: не зарегистрировано не одного обработчика для отчетов. Оптравил сигнал в космос.")

    if( typeof order != "undefined" )
      this.reportHandlers.forEach( fn => fn.call(this, order))
    else if( typeof order == "undefined")
      this.logger.err("Ядро: не получен аргумент в метод отчета.")

  },

  regOrderType : function(obj) {
    if(!obj) return this.logger.err("Ошибка регистрации нового типа заказа: не передан аргумент")

    core.logger.log(`Зарегистрирован новый тип заказа: ${obj.name}`)
    this.orderTypes.push(obj)
  },

  regOrderPlace : function(obj) {
    if(!obj) return this.logger.err("Ошибка регистрации нового места заказа: не передан аргумент")

    this.logger.log(`Зарегистрировано новое место заказа: ${obj.name}. Для типа: ${obj.type}`)
    let res = this.orderTypes.filter(el => el.name == obj.type)[0]
    res.places.push(obj)
  },

  /*
    Method has to verify the recorded message
    Steps:
    - verify Type
    - verify place
    - spawn child node process (process task to verify goods according to menu and return valid obj)
    - send json to front-end
  */
  verify : function(msg, res) {
    // if( !msg.length ) {
    //   res.status(500).end("Получено сообщение 0 длины на распознание.")
    //   return logger.err("Получено сообщение 0 длины на распознание.")
    // }

    // helper: sends handeled error to front
    function sendErr(err) {
      if(res ) {

        this.logger.err(err)
        res.end(JSON.stringify({
          err : err
        }))
        res = null
      }
    }

    var typeStr, placeStr, arr, type, place;

    try {
      typeStr = msg.match(/^[^\s]+\s([^\s]+)\s/)[1]
    } catch(e) {
      return sendErr("Ошибка парсинга в сегменте: тип")
    }

    try {
      placeStr = msg.match(/место\s(.+)\sзаказ/)[1]
    } catch(e) {
      return sendErr("Ошибка парсинга в сегменте: место")
    }

    try {
      arr = msg.match(/(заказ\s.+$)/)[1]
    } catch(e) {
      return sendErr("Ошибка парсинга: выделение места и типа от остальной части заказа")
    }

    var found = false

    /* Find  type */
    for( let t = 0; t < this.orderTypes.length; t++ ) {
      if( found ) break
      for( let j=0; j < this.orderTypes[t].spell.length; j++ ) {
        if( this.orderTypes[t].spell[j].test(typeStr) ) {
          found = true
          type = this.orderTypes[t]
          break
        }
      }
    }

    if( !found )
      return sendErr("Ошибка парсинга: такой тип заказа не обнаружен")


    found = false

    /* Find place */
    for( let t = 0; t < type.places.length; t++ ) {
      if( found ) break
      for( let j = 0; j < type.places[t].spell.length; j++ ) {
        if( type.places[t].spell[j].test(placeStr) ) {
          found = true
          place = type.places[t]
          break
        }
      }
    }

    if( !found )
      return sendErr("Такое заведение не обнаружено")


    this.logger.log("Первичные данные заказа успешно распарсены")

    /* Nice communication =) */
    let child = cp.fork(`${__dirname}/verificator.js`)

    // send message to start execution
    child.send({
      menu : place.menu,
      str : arr
    })

    // Receive response from child process
    child.on('message', data => {
      if(data.err) {
        sendErr(`Ошибка подпроцесса: ${data.err}`)
        return child.kill("SIGTERM")
      }

      let response = data.response
      response.place = place.name
      response.type = type.name

      this.logger.log("Подпроцесс успешно выполнил задание")


      res.send(response)

      /* TODO: check: Confused:: not always kill */
      child.kill("SIGTERM")
    })

  },

  /*
    Methods tsk is to confirm order
    Steps:
    - determine date. Whether we send order now or add to queue
    - dont forget delivery delay
    - respond to front-end
  */
  confirm : function(order, res) {
    let date = order.date,
        type = this.orderTypes.filter(el => el.name == order.type)[0],
        place = type.places.filter(el => el.name == order.place)[0],
        deliveryDelay = place.deliveryDelay

    // Send order immediately
    if( timezone.offset(new Date(), 3)  <= (new Date(date).getTime() + deliveryDelay) ) {
      this.logger.log("Отправляю заказ не немедленное исполнение")

      this.executeOrder(order)

      res.send("Ваш заказ успешно отправлен на немеделенное выполнение. Спасибо, приходите еще.")

    } else {
      this.logger.log("Начинаю добавление заказа в очередь заказов")

      // Or add order to queue
      this.db.addItemToQueue(order, id => {
        let txt = `Ваш заказ успешно добавлен в очередь. ID: ${id}`
        this.logger.log(txt)
        res.send(txt)
      })
    }
  },

  executeOrder : function(order) {
    this.logger.log(`Начали выполнение заказа. ID: ${order.id}`)

    let type = this.orderTypes.filter(el => el.name == order.type)[0]
    let place = type.places.filter(el => el.name == order.place)[0]

    let bot = place.behavior
    let child = cp.fork(bot)

    child.send(order)
  }
}

module.exports = core
