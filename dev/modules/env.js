/* Modules controlling behaviour of the application according to the current environment */
module.exports = function() {
  if(process.env.NODE_ENV == "production") initProduction()
  else initDevelopment()

  // One minute
  global.heartBeatRate = 60000

  global.apiKey = '311ac76d-1da0-46b9-9a65-ac432b551ea5'


  global.port = 3000

  function initProduction() {
    global.connection_string = "mongodb://localhost/helper"
    global.logsPath = "/vagrant/logs"
    global.indexPath = "/vagrant/output/public/index.html"
    global.staticPath = "/vagrant/output/public/"
    global.behaviorFolder = "/vagrant/output/modules/core/behavior"
    global.menuFolder = "/vagrant/output/modules/core/menu"
  }

  function initDevelopment() {
    global.connection_string = 'mongodb://127.0.0.1:27017/helper'
    global.logsPath = "/home/secretNick/develop/projects/devChallenge-Semi/logs"
    global.indexPath = "/home/secretNick/develop/projects/devChallenge-Semi/output/public/index.html"
    global.staticPath = "/home/secretNick/develop/projects/devChallenge-Semi/output/public/"
    global.behaviorFolder = "/home/secretNick/develop/projects/devChallenge-Semi/output/modules/core/behavior"
    global.menuFolder = "/home/secretNick/develop/projects/devChallenge-Semi/output/modules/core/menu"
  }
}
