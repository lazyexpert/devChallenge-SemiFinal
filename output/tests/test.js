'use strict';

// set to production
process.env.NODE_ENV = "production";

var assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    env = require('../modules/env')(),
    logger = require('../modules/logger'),
    colors = require('colors'),
    server = void 0,
    app = void 0,
    core = void 0;

/* Override stdout, collect stream output, backwards */
function getStdout(fn, context, args) {
  var write = process.stdout.write,
      output = "";

  process.stdout.write = function (data) {
    return output += data;
  };
  fn.apply(context, args);
  process.stdout.write = write;
  return output;
}

// Include server module without any stdout
getStdout(function () {
  var module = require('./../server');
  server = module.server;
  app = module.app;
  core = module.core;
}, undefined, []);

/* Override stderr, collect stream output, backwards */
function getStderr(fn, context, args) {
  var write = process.stderr.write,
      output = "";

  process.stderr.write = function (data) {
    return output += data;
  };
  fn.apply(context, args);
  process.stderr.write = write;
  return output;
}

/* Testing Logger */
describe('Logger', function () {
  describe('Method "_format"', function () {
    it('Should return "0" + number if number < 10', function () {
      return assert.equal("05", logger._format(5));
    });
    it('Should return same number if number >= 10', function () {
      return assert.equal("10", logger._format(10));
    });
  });

  describe('Method "_generateFilename"', function () {
    it('Should return filename with current date in format "dd-mm-yyyy.txt"', function () {
      var date = new Date(),
          year = date.getFullYear(),
          month = logger._format(date.getMonth() + 1),
          day = logger._format(date.getDate()),
          str = global.logsPath + '/' + day + '-' + month + '-' + year + '.txt';
      assert.equal(str, logger._generateFilename());
    });
  });

  describe('Method "log"', function () {
    it('Should return formatted with colors and current date "text"', function () {
      var output = getStdout(logger.log, logger, ["text"]),
          date = new Date();

      assert.equal(output, colors.green(date.toLocaleString()) + ' ' + colors.yellow("text") + '\n');
    });

    it('Should put contents to file', function () {
      var filename = logger._generateFilename(),
          fileOld = null;

      if (fs.statSync(filename)) {
        fileOld = fs.readFileSync(filename);
        fs.unlinkSync(filename);
      }

      getStdout(logger.log, logger, ["text"]);

      var date = new Date(),
          contents = fs.readFileSync(filename);

      fs.unlinkSync(filename);

      if (fileOld) fs.writeFileSync(filename, fileOld);

      assert.equal(contents, date.toLocaleString() + ' text\n');
    });

    it('Should create file if it doesn\'t exists', function () {
      var filename = logger._generateFilename(),
          fileOld = null;

      if (fs.statSync(filename)) {
        fileOld = fs.readFileSync(filename);
        fs.unlinkSync(filename);
      }

      getStdout(logger.log, logger, ["text"]);

      var date = new Date(),
          stats = fs.statSync(filename);
      fs.unlinkSync(filename);

      if (fileOld) fs.writeFileSync(filename, fileOld);

      assert.equal(stats !== "undefined", true);
    });
  });

  describe('Method "err"', function () {
    it('Should return formatted with colors and current date "text"', function () {
      var output = getStderr(logger.err, logger, ["text"]),
          date = new Date();
      assert.equal(output, colors.green(date.toLocaleString()) + ' ' + colors.red("text") + '\n');
    });

    it('Should put contents to file', function () {
      var filename = logger._generateFilename(),
          fileOld = null;

      if (fs.statSync(filename)) {
        fileOld = fs.readFileSync(filename);
        fs.unlinkSync(filename);
      }

      getStderr(logger.err, logger, ["text"]);

      var date = new Date(),
          contents = fs.readFileSync(filename);

      fs.unlinkSync(filename);

      if (fileOld) fs.writeFileSync(filename, fileOld);

      assert.equal(contents, '\n' + date.toLocaleString() + ' text\n\n');
    });

    it('Should create file if it doesn\'t exists', function () {
      var filename = logger._generateFilename(),
          fileOld = null;

      if (fs.statSync(filename)) {
        fileOld = fs.readFileSync(filename);
        fs.unlinkSync(filename);
      }

      getStderr(logger.err, logger, ["text"]);

      var date = new Date(),
          stats = fs.statSync(filename);
      fs.unlinkSync(filename);

      if (fileOld) fs.writeFileSync(filename, fileOld);

      assert.equal(stats !== "undefined", true);
    });
  });
});

/* TESTING SERVER */
describe('HTTP-server', function () {
  it('should return status 200 on "/" get', function (done) {
    var write = process.stdout.write;
    process.stdout.write = function () {};

    http.get('http://localhost:3000', function (res) {
      assert.equal('200', res.statusCode);
      process.stdout.write = write;
      done();
    });
  });

  it('should return status 404 on unknown routes', function (done) {
    var write = process.stdout.write;
    process.stdout.write = function () {};

    http.get('http://localhost:3000/unknownhost', function (res) {
      assert.equal('404', res.statusCode);
      process.stdout.write = write;
      done();
    });
  });

  it('should return contents of "index.html"', function (done) {
    var write = process.stdout.write;
    process.stdout.write = function () {};

    var file = fs.readFileSync('public/index.html').toString();

    http.get('http://localhost:3000', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        return data += chunk;
      });

      res.on('end', function () {
        assert.equal(file, data);
        process.stdout.write = write;
        done();
      });
    });
  });

  it('should respond with status 200 on GET /api/ya', function (done) {
    var write = process.stdout.write;
    process.stdout.write = function () {};

    http.get('http://localhost:3000/api/ya', function (res) {
      assert.equal(200, res.statusCode);
      process.stdout.write = write;
      done();
    });
  });

  it('should respond with status 200 on GET /api/getQueue', function (done) {
    var write = process.stdout.write;
    process.stdout.write = function () {};

    http.get('http://localhost:3000/api/getQueue', function (res) {
      assert.equal(200, res.statusCode);
      process.stdout.write = write;
      done();
    });
  });
});

/* TESTING ENVIRONMENT MODULE */
describe('Env module', function () {
  it('should set port to 3000', function () {
    return assert(global.port, 3000);
  });

  it('should set heartBeatRate to 60000', function () {
    return assert(global.heartBeatRate, 60000);
  });

  it('should set mongo connection string value', function () {
    return assert(global.connection_string, "mongodb://localhost/helper");
  });

  it('should set logs path', function () {
    return assert(global.logsPath, "/vagrant/logs");
  });

  it('should set index path', function () {
    return assert(global.indexPath, "/vagrant/output/public/index.html");
  });

  it('should set static path', function () {
    return assert(global.staticPath, "/vagrant/output/public/");
  });

  it('should set behavior folder', function () {
    return assert(global.behaviorFolder, "/vagrant/output/modules/core/behavior");
  });

  it('should set menu folder', function () {
    return assert(global.menuFolder, "/vagrant/output/modules/core/menu");
  });
});

/* TESTING CORE */
describe('Core module', function () {
  describe('Method init', function () {
    it('should set core instance to app.core', function () {
      assert.equal(app.core, core);
    });

    it('should set app instance to core.app', function () {
      assert.equal(core.app, app);
    });

    it('should register new type "Пицца"', function () {
      var type = core.orderTypes.filter(function (el) {
        return el.name == "Пицца";
      })[0];
      assert.equal(type.name, 'Пицца');
    });

    it('should register new place "Мамамия" for type "Пицца"', function () {
      var type = core.orderTypes.filter(function (el) {
        return el.name == "Пицца";
      })[0];
      var place = type.places.filter(function (el) {
        return el.name == "Мамамия";
      })[0];
      assert.equal(place.name, 'Мамамия');
    });
  });

  describe('Method regReportHandler', function () {
    it('should register a handler', function () {
      var old = core.reportHandlers;
      core.reportHandlers = [];
      var hello = "";

      getStdout(core.regReportHandler, core, [function () {
        return hello = "world";
      }]);

      core.report({});
      core.reportHandlers = old;
      assert.equal(hello, "world");
    });
  });

  describe('Method report', function () {
    it('should execute reporthandler', function () {
      var old = core.reportHandlers;
      core.reportHandlers = [];
      var hello = "";

      getStdout(core.regReportHandler, core, [function () {
        return hello = "world";
      }]);

      core.report({});
      core.reportHandlers = old;
      assert.equal(hello, "world");
    });

    it('should make logger.err call if no arg passed', function () {
      var old = core.reportHandlers;
      core.reportHandlers = [];
      var hello = "";

      getStdout(core.regReportHandler, core, [function () {
        return hello = "world";
      }]);

      var out = getStderr(core.report, core, []);

      core.reportHandlers = old;
      var date = new Date();

      assert.equal(out, colors.green(date.toLocaleString()) + ' ' + colors.red("Ядро: не получен аргумент в метод отчета.") + '\n');
    });

    it('should make logger.err call if no handlers registered', function () {
      var old = core.reportHandlers;
      core.reportHandlers = [];

      var out = getStderr(core.report, core, [{ "hi": "bye" }]);

      core.reportHandlers = old;

      var date = new Date();
      var expected = colors.green(date.toLocaleString()) + ' ' + colors.red("Ядро: не зарегистрировано не одного обработчика для отчетов. Оптравил сигнал в космос.") + '\n';

      assert.equal(out, expected);
    });
  });

  describe('Method regOrderType', function () {
    it('should register new order type', function () {
      var old = core.orderTypes;

      getStdout(core.regOrderType, core, [{
        name: "test",
        spell: [/пицца/, /пиццу/, /пиццы/],
        places: []
      }]);

      var type = core.orderTypes.filter(function (el) {
        return el.name == "test";
      })[0];

      core.orderTypes = old;

      assert.equal(type.name, "test");
    });

    it('should make logger.err call if no arg passed', function () {
      var out = getStderr(core.regOrderType, core, []),
          date = new Date();
      var expected = colors.green(date.toLocaleString()) + ' ' + colors.red("Ошибка регистрации нового типа заказа: не передан аргумент") + '\n';
      assert.equal(out, expected);
    });
  });

  describe('Method regOrderPlace', function () {
    it('should register new order place', function () {
      var type = core.orderTypes.filter(function (el) {
        return el.name == "Пицца";
      })[0],
          placesOld = type.places;

      getStdout(core.regOrderPlace, core, [{
        type: "Пицца",
        name: "test",
        url: "http://mamamia.ua/",
        spell: [/мамма мия/, /mamma mia/, /mammamia/, /маммамия/, /мама мия/, /mama mia/, /мама мне/, /мама миа/],
        deliveryDelay: 1000 * 60 * 60 * 4,
        menu: "./menu/mammamia.js",
        behavior: global.behaviorFolder + '/mammamia.js'
      }]);

      var place = type.places.filter(function (el) {
        return el.name == "test";
      })[0];

      type.places = placesOld;

      assert.equal(place.name, "test");
    });

    it('should make logger.err call if no arg passed', function () {
      var out = getStderr(core.regOrderPlace, core, []),
          date = new Date();
      var expected = colors.green(date.toLocaleString()) + ' ' + colors.red("Ошибка регистрации нового места заказа: не передан аргумент") + '\n';
      assert.equal(out, expected);
    });
  });
});