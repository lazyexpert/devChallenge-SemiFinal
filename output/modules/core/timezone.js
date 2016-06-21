"use strict";

module.exports = {
  // Adds +3 hours to time
  offset: function offset(time, _offset) {
    var ms = time.getTime();
    ms += _offset * 60 * 60 * 1000;
    return new Date(ms);
  }
};