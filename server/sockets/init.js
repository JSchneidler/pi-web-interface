// Middleware
var middleware = require('./middleware');

// Loops
var infoLoops = require('./loops/system-info');

// Events
var terminalEvents = require('./events/terminal');


module.exports = function(io) {
  clients = {};

  middleware(io); // Attach IO middleware

  infoLoops(io); // Begin emission loops before clients connect

  io.on('connection', function(client) {
    //console.dir(client);
    clients[client.id] = client;
    console.log('New client. Total: ' + Object.keys(clients).length);

    // Event handlers
    terminalEvents(io, client); // Attach terminal event handlers

    // Disconnect handler
    client.on('disconnect', function() {
      delete clients[client.id];
      console.log('Lost client. Total: ' + Object.keys(clients).length);
    });
  });
};
