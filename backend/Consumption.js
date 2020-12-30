function Consumption() {
  this.date = null;
  this.m3 = null;

  /** Parse data from req.body
   * @param {object} body
   */
  Consumption.prototype.parse = function(body) {
    if (body) {
      if (body.date && body.m3) {
        this.date = body.date;
        this.m3 = body.m3;
        return;
      }
    }

    this.date = null;
    this.m3 = null;
  };

  /**
   * Get consumption as CSV line
   */
  Consumption.prototype.getAsCSV = function() {
    return this.date + ";" + this.m3 + "\n";
  };
}

module.exports = Consumption;
