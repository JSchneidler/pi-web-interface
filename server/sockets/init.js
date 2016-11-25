// Middleware
var middleware = require('./middleware');

// Events
var terminalEvents = require('./events/terminal');

// Loops
var infoLoops = require('./loops/system-info');

module.exports = function(io) {
  clients = [];

  middleware(io); // Attach IO middleware

  infoLoops(io); // Begin emission loops before clients connect

  io.on('connection', function(client) {
    clients.push(client);
    console.log('New client. Total: ' + clients.length);
    terminalEvents(io, client); // Attach terminal event handlers

    client.on('disconnect', function() {
      clients.splice(clients.indexOf(client), 1); // Remove client from list of clients
      console.log('Lost client. Total: ' + clients.length);
    });
  });
};
