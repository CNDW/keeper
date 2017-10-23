const server = require('./api');
const { db } = require('./api/db');

server.app.db = db;

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});
