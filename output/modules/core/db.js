'use strict';

var pmongo = require('promised-mongo').compatible(),
    db = pmongo(global.connection_string, ['queue']),
    logger = require('../logger');

/*
  Orders structure
  sessionId : req.session.id,
  order : JSON.strinfify(orderObject),
  executionTime : order.date - order.place.deliveryDelay
*/
// Get queue for exact user
module.exports.getQueue = function (id, cb) {
  logger.log('Получаю очередь. sessionId: ' + id);
  db.queue.find({ "sessionId": id }).then(function (docs) {
    logger.log('Получена очередь. sessionId: ' + id + '. Длина очереди: ' + docs.length);
    cb(docs);
  }).catch(function (err) {
    return logger.err(err);
  });
};

// Get max order id, increment, save new one
module.exports.addItemToQueue = function (item, cb) {
  var _this = this;

  // get max queue id
  db.queue.find({}).sort({ "id": -1 }).limit(1).then(function (docs) {
    var id = void 0;

    if (docs.length) id = docs[0].id + 1;else id = 1;

    item.id = id;
    var type = _this.core.orderTypes.filter(function (el) {
      return el.name == item.type;
    })[0];
    var place = type.places.filter(function (el) {
      return el.name == item.place;
    })[0];

    // Insert item to queue
    db.queue.insert({
      "order": JSON.stringify(item.order),
      "name": item.name,
      "adress": item.adress,
      "phone": item.phone,
      "date": item.date,
      "place": item.place,
      "type": item.type,
      "sessionId": item.sessionId,
      "id": id,
      "executionTime": new Date(Date.parse(item.date) - place.deliveryDelay)
    }).then(function (docs) {
      return cb(id);
    }).catch(function (err) {
      return logger.err(err);
    });
  }).catch(function (err) {
    return logger.err(err);
  });
};

// Delete Item from queue by id
module.exports.deleteItemFromQueue = function (id, cb) {
  db.queue.remove({ "id": id }).then(function (docs) {
    return cb();
  }).catch(function (err) {
    return logger.err(err);
  });
};

// Get closest item from queue to execution (by time)
module.exports.getClosestQueueItem = function (cb) {
  logger.log("Модуль управления бд: получаю ближайший заказ на выполнение");
  db.queue.find({}).sort({ "executionTime": -1 }).limit(1).then(function (docs) {
    return cb(docs);
  }).catch(function (err) {
    return logger.err(err);
  });
};