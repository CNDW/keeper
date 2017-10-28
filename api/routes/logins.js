const Login = require('../models/login');

module.exports = [
  {
    method: 'GET',
    path: '/api/logins',
    handler(request, reply) {
      reply({
        data: [
          { id: 'foo', type: 'login' }
        ]
      });
    }
  }
];
