module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client connected');
    socket.on('message', function(from, msg) {
      console.log('received message from:', from, 'msg', JSON.stringify(msg));
      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
};
