var config = {
  __base: __dirname + '/',
  env: process.env.ENV || 'development',
  port: 3000,
  db_url: process.env.DB_URL || 'mongodb://localhost/piwi-dev',
  distPath: __dirname + '/../client/dist/',
  dbPath: __dirname + '/database/'
};

module.exports = config;
