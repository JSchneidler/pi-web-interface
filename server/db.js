module.exports = function(mongoose) {
  return {
    connect: function() {
      mongoose.connect(config.db_url, function(err) {
        if (err) return console.error('Could not connect to MongoDB at ' + config.db_url);
        console.log('Connected to MongoDB.');
      });
    }
  };
}
