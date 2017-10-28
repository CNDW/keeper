const Hapi = require('hapi');
const HapiAuthJwt = require('hapi-auth-jwt');

const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.KEEPER_PORT || 3008
});

server.register(HapiAuthJwt, (err) => {
  if (err) console.error(err);

  server.auth.strategy('token', 'jwt', {
    key: '8749d011b5556cd434c328b613e552ffe1d5ccdc', // TODO: Move to secrets...
    verifyOptions: { algorithms: ['HS256'] }
  });
})

routes.forEach(route => server.route(route));

module.exports = server;
