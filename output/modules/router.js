'use strict';

var router = require('express').Router(),
    logger = require('./logger');

// Simple hide ya api options from frontend
router.get('/api/ya', function (req, res) {
  res.send(JSON.stringify({
    lang: 'ru-RU',
    apikey: global.apiKey,
    utteranceSilence: 30
  }));
});

// Verify order
router.post('/api/verifyOrder', function (req, res) {
  if (!req.body.msg) {
    logger.err("Пришел пустой заказ");
    res.status(500).end();
  } else {
    res.status(200);
    res.app.core.verify(req.body.msg, res);
  }
});

// Confirm order
router.post('/api/confirmOrder', function (req, res) {
  logger.log("Пользователь подтвердил заказ");

  var order = req.body;

  order.sessionId = req.session.id;
  res.app.core.confirm(order, res);
});

// Get queue
router.get('/api/getQueue', function (req, res) {
  res.app.core.db.getQueue(req.session.id, function (docs) {
    return res.send(JSON.stringify(docs));
  });
});

// Delete item from queue
router.post('/api/deleteItemFromQueue', function (req, res) {
  if (!req.body.id) res.status(500).end();else res.app.core.db.deleteItemFromQueue(req.body.id, function () {
    return res.end();
  });
});

module.exports = router;