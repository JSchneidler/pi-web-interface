// TODO: Split listeners into individual modules: http://stackoverflow.com/questions/24815106/can-i-separate-socket-io-event-listeners-into-different-modules
module.exports = function(socket) {
  socket.on('connection', function(client) {
    console.log('Client connected');

    // Load event handlers
    require('./terminal')(socket, client);
  });

  socket.on('disconnect', function() {
    console.log('Client disconnected');
  });
};
