const pmongo = require('promised-mongo').compatible(),
      db = pmongo(global.connection_string, ['queue']),
      logger = require('../logger')      


/*
  Orders structure
  sessionId : req.session.id,
  order : JSON.strinfify(orderObject),
  executionTime : order.date - order.place.deliveryDelay
*/
// Get queue for exact user
module.exports.getQueue = function(id, cb) {
  logger.log(`Получаю очередь. sessionId: ${id}`)
  db.queue.find({ "sessionId" : id })
  .then( docs => {
    logger.log(`Получена очередь. sessionId: ${id}. Длина очереди: ${docs.length}`)
    cb(docs)
  })
  .catch( err => logger.err(err))
}


// Get max order id, increment, save new one
module.exports.addItemToQueue = function(item, cb) {
  // get max queue id
  db.queue.find({}).sort({"id" : -1}).limit(1)
  .then (docs => {
    let id

    if( docs.length ) id = docs[0].id + 1
    else id = 1

    item.id = id
    let type = this.core.orderTypes.filter(el => el.name == item.type)[0]
    let place = type.places.filter(el => el.name == item.place)[0]

    // Insert item to queue
    db.queue.insert({
      "order": JSON.stringify(item.order),
      "name" : item.name,
      "adress" : item.adress,
      "phone" : item.phone,
      "date" : item.date,
      "place" : item.place,
      "type" : item.type,
      "sessionId" : item.sessionId,
      "id" : id,
      "executionTime" : new Date(Date.parse(item.date)-place.deliveryDelay)
    })
    .then( docs => cb(id) )
    .catch( err => logger.err(err) )

  })
  .catch(err => logger.err(err))
}

// Delete Item from queue by id
module.exports.deleteItemFromQueue = function(id, cb) {
  db.queue.remove({ "id" : id})
  .then(docs => cb())
  .catch(err => logger.err(err))
}

// Get closest item from queue to execution (by time)
module.exports.getClosestQueueItem = function(cb) {
  logger.log("Модуль управления бд: получаю ближайший заказ на выполнение")
  db.queue.find({}).sort({"executionTime" : -1}).limit(1)
  .then( docs => cb(docs))
  .catch( err => logger.err(err) )
}
