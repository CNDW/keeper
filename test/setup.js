const server = require('../api');

beforeAll((done) => {
  server.on('start', () => done());
  server.start((err) => {
    if (err) {
      throw err;
    }
  });
});

afterAll((done) => {
  server.on('stop', () => done());
  server.stop();
});

const requestDefaults = {
  method: 'GET'
};

global.request = function(options) {
  return new Promise((resolve) => {
    server.inject({...requestDefaults, ...options}, (res) => resolve(res));
  });
};
