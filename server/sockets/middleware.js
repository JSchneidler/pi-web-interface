module.exports = function(io) {

  io.pass = function(event, data) {
    io.emit(event, {
      success: true,
      data: data
    });
  };

  io.fail = function(event, data) {
    io.emit(event, {
      success: false,
      data: data
    });
  };

};
