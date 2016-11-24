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
