var path = require('path');

module.exports = {
  db: {
    prod_url: 'mongodb://localhost/mean-prod',
    test_url: 'mongodb://localhost/mean-test'
  },
  server: {
    port: 3000,
    distFolder: path.resolve(__dirname, '../client/dist'),
    dbPath: path.resolve(__dirname, 'database')
  }
};