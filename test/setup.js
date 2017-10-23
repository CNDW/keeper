const server = require('../api');
const db = require('../api/db');

server.app.db = db;
db.namespace = `TEST-${db.namespace}`;

server.on('request-error', (err) => {
  console.log(err);
});

beforeAll(() => {

});

afterAll(() => {

});

const requestDefaults = {
  method: 'GET'
};

global.request = function(options) {
  return server.inject({...requestDefaults, ...options});
};
