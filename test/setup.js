const server = require('../api');
const db = require('../api/db');

server.on('request-error', (err) => {
  console.log(err);
});

beforeAll(async () => {
  if (!/^test-/i.test(db.namespace)) {
    db.namespace = `test-${db.namespace}`;
  }
  await db.deleteNamespace();
  await db.createNamespace();
});

afterAll(() => {

});

const requestDefaults = {
  method: 'GET'
};

global.request = options => server.inject({...requestDefaults, ...options});
