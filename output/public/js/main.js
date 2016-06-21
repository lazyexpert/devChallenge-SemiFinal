"use strict";

/*
  setting DEBUG = true leads to shorter circuit of record/recognition
  good option for testing backend
*/

window.DEBUG = false;

var app = angular.module('assistant', []);

// Utils
// jquery like request
window.request = function (opt) {
  var xhr = new XMLHttpRequest();

  xhr.open(opt.method || "GET", opt.url, true);

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(opt.data);

  xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status != 200) {
      if (opt.error) return opt.error('Error: ' + (this.status ? "(" + this.status + ") " + this.statusText : 'request fail'));
    } else {
      if (opt.success) return opt.success(this.responseText);
    }
  };
};

// Order
app.directive('order', function () {
  return {
    restrict: "E",
    templateUrl: "includes/order.html",
    controllerAs: "orderCtrl",
    controller: function controller($scope) {
      var _this = this;

      this.verifyFragment = function (fragment) {
        this.tempSpeech.push(fragment);
      };

      this.showStartRec = function () {
        return !_this.rec && !_this.recordFinished;
      };

      this.startRec = function () {
        _this.rec = true;
        _this.streamer.start(_this.options);
      };

      this.stopRec = function () {
        _this.rec = false;
        _this.recordFinished = true;

        // Make delay of stopping streamer object
        // just to make sure that last phrase comes back from yandex
        setTimeout(function () {
          _this.streamer.stop();

          _this.speech = _this.tempSpeech.join(" ");
          _this.tempSpeech = [];

          if (DEBUG) {
            // execute on 20.05.2016
            //this.speech = "заказать пиццу место маммамия заказ пицца модильяни средняя одна штука и напиток кока кола две штуки на имя петр адрес улица крещатик 35 квартира 200 номер телефона 093 321 25 26 дата 20.05.2016г в 18-00"
            // execute now
            _this.speech = "заказать пиццу место маммамия заказ пицца модильяни средняя одна штука и напиток кока кола две штуки на имя петр адрес улица крещатик 35 квартира 200 номер телефона 093 321 25 26 дата сейчас";
          }

          console.log(_this.speech);

          request({
            method: "post",
            url: "/api/verifyOrder",
            data: JSON.stringify({ msg: _this.speech }),
            error: function error(err) {
              return console.error(err);
            },
            success: function success(data) {
              var obj = JSON.parse(data);
              if (obj.err) {
                _this.error = obj.err;
                console.error(obj.err);
              } else _this.order = JSON.parse(data);

              console.log(_this.order);
              _this.refreshScope();
            }
          });
        }, 2000);
      };

      this.refreshScope = function () {
        $scope.$apply();
      };

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

      this.send = function () {
        request({
          url: "/api/confirmOrder",
          method: "post",
          data: JSON.stringify(_this.order),
          error: function error(err) {
            return console.error(err);
          },
          success: function success(data) {
            _this.init();

            alert(data);

            // Fire event for queue
            document.dispatchEvent(new Event("refresh-queue"));
          }
        });
      };

      this.init = function () {
        _this.rec = false;
        _this.recordFinished = false;
        _this.orderVerified = false;

        _this.error = "";

        // temp storage
        _this.tempSpeech = [];
        _this.speech = "";

        _this.order = null;

        _this.streamer = new ya.speechkit.SpeechRecognition();

        if (typeof _this.options == "undefined") {
          // Get yandex settings
          request({
            url: "/api/ya",
            error: function error(err) {
              return console.error(err);
            },
            success: function success(data) {
              _this.options = JSON.parse(data);

              _this.options.dataCallback = function (text, done) {
                if (done) _this.verifyFragment(text.toLowerCase());
              };

              _this.options.errorCallback = function (err) {
                return console.error(err);
              };
            }
          });
        }
      };
    }
  };
});

// Queue
app.directive('queue', function () {
  return {
    restrict: "E",
    templateUrl: "includes/queue.html",
    controllerAs: "queue",
    controller: function controller($scope) {
      var _this3 = this;

      this.orders = [];

      this.remove = function (id) {
        var _this2 = this;

        request({
          url: "/api/deleteItemFromQueue",
          method: "post",
          data: JSON.stringify({ id: id }),
          error: function error(err) {
            return console.error(err);
          },
          success: function success(data) {
            _this2.orders = _this2.orders.filter(function (el) {
              return el.id !== id;
            });
            $scope.$apply();
          }
        });
      };

      this.init = function () {
        // get queue
        request({
          url: "/api/getQueue",
          error: function error(err) {
            return console.error(err);
          },
          success: function success(queue) {
            _this3.orders = JSON.parse(queue).map(function (el) {
              el.order = JSON.parse(el.order);
              return el;
            });
            $scope.$apply();
          }
        });
      };

      document.addEventListener('refresh-queue', this.init);
    }

  };
});

// Rules
app.directive('rules', function () {
  return {
    restrict: "E",
    templateUrl: "includes/rules.html",
    controllerAs: "rules",
    controller: function controller() {
      this.list = ["Разрешите использование микрофона (если оно у вас спрашивается)", "Нажмите кнопку записи", "Произнесите свой заказ", "Нажмите кнопку остановки записи", "Проверьте соответствует ли сказанное отображаемому", "Подтвердите отправку данных или попробуйте заново"];
    }
  };
});