var _ = require('lodash');

module.exports = function(io) {
  io.pass = function(event, data, clients) {
    handleEmission(event, data, clients, { success: true, data: data });
  };

  io.fail = function(event, data, clients=[]) {
    handleEmission(event, data, clients, { success: false, data: data });
  };

  function handleEmission(event, data, clients, response) {
    // No clients provided, send to everyone
    if (!clients) return io.emit(event, response);

    // Pack client into array if it isn't one
    if (!_.isArray(clients)) clients = [clients];
    
    // Given client objects
    if (_.isObject(clients[0])) {
      return _.forEach(clients, function(client) {
        client.emit(event, response);
      });
    }
    // Given rooms/ids
    if (_.isString(clients[0])) {
      return _.forEach(clients, function(room) {
        io.to(room).emit(event, response);
      });
    }
  }
};


