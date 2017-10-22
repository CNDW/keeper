// mock-couch is using a dependency that is trying to reference the
// depricated process.EventEmitter api, need to shim it here
process.EventEmitter = require('events'); // eslint-disable-line
const http = require('http');
const { OutgoingMessage } = require('_http_outgoing'); // eslint-disable-line
const MockCouch = require('mock-couch');
const portfinder = require('portfinder'); // eslint-disable-line
const createServer = require('../api');

// Mock-Couch's restify overrides this function which breaks on node >8.0, undoing the damage
require('restify/lib/response'); // eslint-disable-line
http.ServerResponse.prototype.getHeaders = OutgoingMessage.prototype.getHeaders;
http.ServerResponse.prototype.headers = OutgoingMessage.prototype.getHeaders;

const server = createServer();
const mockCouch = MockCouch.createServer();

server.on('request-error', (err) => {
  console.log(err);
});

async function configureCouch() {
  process.env.COUCH_PORT = await portfinder.getPortPromise();
  mockCouch.listen(process.env.COUCH_PORT);
}

beforeAll((done) => {
  configureCouch()
    .then(() => done())
    .catch(err => done(err));
});

afterAll(() => {
  mockCouch.close();
});

const requestDefaults = {
  method: 'GET'
};

global.request = function(options) {
  return server.inject({...requestDefaults, ...options});
};
