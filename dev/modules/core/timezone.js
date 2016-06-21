module.exports = {
  // Adds +3 hours to time
  offset : function(time, offset) {
    let ms = time.getTime()
    ms += offset * 60 * 60 * 1000
    return new Date(ms)
  }
}
