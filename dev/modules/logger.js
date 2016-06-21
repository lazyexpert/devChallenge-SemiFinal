"use strict"

var colors = require('colors'),
    fs = require('fs'),
    env = require('./env')()

class Logger {
  log(data) {
    var date = new Date()
    var output = `${colors.green(date.toLocaleString())} ${colors.yellow(data)}`
    var outputSimple = `${date.toLocaleString()} ${data}\n`

    // Log to stdout
    process.stdout.write(output + "\n")

    // Save log to file
    fs.appendFileSync(this._generateFilename(), outputSimple)
  }

  err(data) {
    var date = new Date(),
        output = `${colors.green(date.toLocaleString())} ${colors.red(data)}`,
        outputSimple = `\n${date.toLocaleString()} ${data}\n\n`

    // Log to stderr
    process.stderr.write(output + "\n")

    // Save err log to file
    var file = this._generateFilename()
    fs.appendFileSync(file, outputSimple)
  }


  /* PSEUDO PRIVATE METHODS */
  _format(num) {
    return num < 10? "0" + num : num
  }

  _generateFilename() {
    var date = new Date()
    return `${global.logsPath}/${this._format(date.getDate())}-${this._format(date.getMonth()+1)}-${date.getFullYear()}.txt`
  }
}

module.exports = new Logger()
