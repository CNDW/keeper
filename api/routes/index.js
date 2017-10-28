const loginRoutes = require('./logins');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      reply('ello wurld');
    }
  },
  ...loginRoutes
];
