const router = require('express').Router(),
      logger = require('./logger')

// Simple hide ya api options from frontend
router.get('/api/ya', (req, res) => {
  res.send(JSON.stringify({
    lang: 'ru-RU',
    apikey: global.apiKey,
    utteranceSilence : 30
  }))
})

// Verify order
router.post('/api/verifyOrder', (req, res) => {
  if(!req.body.msg) {
    logger.err("Пришел пустой заказ")
    res.status(500).end()
  }
  else {
    res.status(200)
    res.app.core.verify(req.body.msg, res)
  }
})

// Confirm order
router.post('/api/confirmOrder', (req, res) => {
  logger.log("Пользователь подтвердил заказ")

  let order = req.body

  order.sessionId = req.session.id
  res.app.core.confirm(order, res)
})

// Get queue
router.get('/api/getQueue', (req, res) => {
  res.app.core.db.getQueue(req.session.id, docs => res.send(JSON.stringify(docs)) )
})

// Delete item from queue
router.post('/api/deleteItemFromQueue', (req, res) => {
  if(!req.body.id) res.status(500).end()
  else res.app.core.db.deleteItemFromQueue(req.body.id, () => res.end())
})

module.exports = router
