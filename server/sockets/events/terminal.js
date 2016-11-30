module.exports = function(io, client) {
  client.on('terminal.input', function(message, user) {
    console.log(user.username + ' executed: ' + message);
    io.pass('terminal.output', message, client);
  });
}
