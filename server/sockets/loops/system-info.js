var controller = require('./controllers/system-info.controller');

module.exports = function(io) {
  controller = controller(io); // Initialize controller with IO instance

  setInterval(function() {
    controller.systemInfo();
  }, 2500);
  setInterval(function() {
    controller.systemTime();
  }, 1000);

};
