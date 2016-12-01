var terminalController = require('./controllers/terminal.controller');

module.exports = function(io, client) {
  var controller = terminalController(io, client);
  client.on('terminal.input', controller.execute);
};
