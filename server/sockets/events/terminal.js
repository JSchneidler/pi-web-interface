module.exports = function(io, client) {
  client.on('terminal', function(message, user) {
    console.log(user.username + ' executed: ' + message);
    io.pass('terminal', message);
  });
}
