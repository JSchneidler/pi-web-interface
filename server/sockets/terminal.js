module.exports = function(socket, client) {
  client.on('terminal', function(message, user) {
    console.log(user.username + ' executed: ' + message);
    socket.emit('terminal', 'test');
    socket.sockets.emit('terminal', 'test');
  });
};
