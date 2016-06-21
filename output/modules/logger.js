"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = require('colors'),
    fs = require('fs'),
    env = require('./env')();

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: 'log',
    value: function log(data) {
      var date = new Date();
      var output = colors.green(date.toLocaleString()) + ' ' + colors.yellow(data);
      var outputSimple = date.toLocaleString() + ' ' + data + '\n';

      // Log to stdout
      process.stdout.write(output + "\n");

      // Save log to file
      fs.appendFileSync(this._generateFilename(), outputSimple);
    }
  }, {
    key: 'err',
    value: function err(data) {
      var date = new Date(),
          output = colors.green(date.toLocaleString()) + ' ' + colors.red(data),
          outputSimple = '\n' + date.toLocaleString() + ' ' + data + '\n\n';

      // Log to stderr
      process.stderr.write(output + "\n");

      // Save err log to file
      var file = this._generateFilename();
      fs.appendFileSync(file, outputSimple);
    }

    /* PSEUDO PRIVATE METHODS */

  }, {
    key: '_format',
    value: function _format(num) {
      return num < 10 ? "0" + num : num;
    }
  }, {
    key: '_generateFilename',
    value: function _generateFilename() {
      var date = new Date();
      return global.logsPath + '/' + this._format(date.getDate()) + '-' + this._format(date.getMonth() + 1) + '-' + date.getFullYear() + '.txt';
    }
  }]);

  return Logger;
}();

module.exports = new Logger();