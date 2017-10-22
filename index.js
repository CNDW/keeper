const server = require('./api');
const DB = require('./api/db');

DB.initialize.then(() => {
  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
  });
});
