const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    reply('ello wurld');
  }
});

module.exports = server;
