const express = require('express'),
      app = express(),
      http = require('http'),
      path = require('path'),
      bodyParser = require('body-parser'),
      core = require('./modules/core'),
      router = require('./modules/router'),
      logger = require('./modules/logger'),
      session = require('express-session'),
      MongoStore = require('connect-mongo/es5')(session),
      env = require('./modules/env')()

app.use(session({
  secret: 'buymwv[-l]',
  resave: true,
  store: new MongoStore({
    url: global.connection_string,
    touchAfter: 30 * 24 * 3600 // time period in seconds == month
  }),
  saveUninitialized: true
}))



/* logger middleware */
app.use(function(req, res, next) {
  logger.log(`Получен http запрос ${req.method} ${req.url}`)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(global.staticPath))

app.get('/', function(req, res) {
  res.sendFile(global.indexPath)
})

// App's logic is held here
core.init(app, logger)

app.use(router)

const server = http.createServer(app)



server.listen(global.port)

logger.log(`Сервер запущен и доступен по порту: ${global.port}`)

module.exports.server = server
module.exports.app = app
module.exports.core = core
