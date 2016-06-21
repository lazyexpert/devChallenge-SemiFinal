"use strict";

/*
  setting DEBUG = true leads to shorter circuit of record/recognition
  good option for testing backend
*/
window.DEBUG = false

var app = angular.module('assistant', [])

// Utils
// jquery like request
window.request = function(opt) {
  let xhr = new XMLHttpRequest()

  xhr.open(opt.method || "GET", opt.url, true)

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(opt.data)

  xhr.onreadystatechange = function() {
    if (this.readyState != 4)
      return

    if (this.status != 200) {
      if( opt.error ) return opt.error( 'Error: ' + (this.status ? `(${this.status}) ${this.statusText}`: 'request fail'))
    } else {
      if( opt.success ) return opt.success(this.responseText)
    }
  }
}

// Order
app.directive('order', function() {
  return {
    restrict: "E",
    templateUrl: "includes/order.html",
    controllerAs: "orderCtrl",
    controller : function($scope){
      this.verifyFragment = function(fragment) {
        this.tempSpeech.push(fragment)
      }

      this.showStartRec = () => !this.rec && !this.recordFinished

      this.startRec = () => {
        this.rec = true
        this.streamer.start(this.options)
      }

      this.stopRec = () => {
        this.rec = false
        this.recordFinished = true

        // Make delay of stopping streamer object
        // just to make sure that last phrase comes back from yandex
        setTimeout( () => {
          this.streamer.stop()

          this.speech = this.tempSpeech.join(" ")
          this.tempSpeech = []

          if(DEBUG) {
            // execute on 20.05.2016
            //this.speech = "заказать пиццу место маммамия заказ пицца модильяни средняя одна штука и напиток кока кола две штуки на имя петр адрес улица крещатик 35 квартира 200 номер телефона 093 321 25 26 дата 20.05.2016г в 18-00"
            // execute now
            this.speech = "заказать пиццу место маммамия заказ пицца модильяни средняя одна штука и напиток кока кола две штуки на имя петр адрес улица крещатик 35 квартира 200 номер телефона 093 321 25 26 дата сейчас"
          }

          console.log(this.speech)

          request({
            method : "post",
            url : "/api/verifyOrder",
            data : JSON.stringify({ msg : this.speech }),
            error : err => console.error(err),
            success: data => {
              var obj = JSON.parse(data)
              if(obj.err) {
                this.error = obj.err
                console.error(obj.err)
              } else
                this.order = JSON.parse(data)

              console.log(this.order)
              this.refreshScope()

            }
          })
        }, 2000)

      }

      this.refreshScope = () => {
        $scope.$apply()
      }

      /* Order object example receiving from backend
        {
          "order": [{
              "type": "Пицца",
              "title": "Модильяни",
              "size": "Средняя",
              "count": "1"
            },
            {
            "type":"Напитки",
            "title":
            "Coca-Cola",
            "size":"default",
            "count":"2"
          }],
          "name":"Петр",
          "adress":" улица крещатик 35  квартира 200 ",
          "phone":"(093) 321-25-26",
          "date":"4/2/2016, 6:00:00 PM",
          "type":"Пицца",
          "place": "Мамамия"
        }
      */

      this.send = () => {
          request({
            url : "/api/confirmOrder",
            method: "post",
            data: JSON.stringify(this.order),
            error : err => console.error(err),
            success : data => {
              this.init()

              alert(data)

              // Fire event for queue
              document.dispatchEvent(new Event("refresh-queue"))
            }
          })
      }

      this.init = () => {
        this.rec = false
        this.recordFinished = false
        this.orderVerified = false

        this.error = ""

        // temp storage
        this.tempSpeech = []
        this.speech = ""

        this.order = null

        this.streamer = new ya.speechkit.SpeechRecognition()

        if( typeof this.options == "undefined") {
          // Get yandex settings
          request({
            url : "/api/ya",
            error : err => console.error(err),
            success : data => {
              this.options = JSON.parse(data)

              this.options.dataCallback = (text, done) => {
                if(done) this.verifyFragment(text.toLowerCase())
              }

              this.options.errorCallback = err => console.error(err)
            }
          })
        }
      }
  }
}})

// Queue
app.directive('queue', function() {
  return {
    restrict: "E",
    templateUrl: "includes/queue.html",
    controllerAs: "queue",
    controller: function($scope){
      this.orders = []

      this.remove = function(id) {
        request({
          url: "/api/deleteItemFromQueue",
          method: "post",
          data: JSON.stringify({id:id}),
          error: err => console.error(err),
          success: data => {
            this.orders = this.orders.filter( el => el.id !== id)
            $scope.$apply()
          }
        })
      }



      this.init = () => {
        // get queue
        request({
          url : "/api/getQueue",
          error: err => console.error(err),
          success: queue => {
            this.orders = JSON.parse(queue).map(el => {
              el.order = JSON.parse(el.order)
              return el
            })
            $scope.$apply()
          }
        })
      }

      document.addEventListener('refresh-queue', this.init)


    }

  }
})

// Rules
app.directive('rules', function() {
  return {
    restrict: "E",
    templateUrl: "includes/rules.html",
    controllerAs: "rules",
    controller : function() {
      this.list = [
        "Разрешите использование микрофона (если оно у вас спрашивается)",
        "Нажмите кнопку записи",
        "Произнесите свой заказ",
        "Нажмите кнопку остановки записи",
        "Проверьте соответствует ли сказанное отображаемому",
        "Подтвердите отправку данных или попробуйте заново"
      ]
    }
  }
})
