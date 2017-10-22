const got = require('got');

const DEFAULT_OPTS = {
  protocol: 'http:',
  hostname: 'localhost',
  port: process.env.COUCH_PORT || '5984'
};

const DEFAULT_HEADERS = {
  Accept: 'application/json'
};

const NAMESPACE = 'keeper';

function request(opts={}) {
  let { path='/' } = opts;
  if (path[0] !== '/') path = `/${path}`;
  return got({
    ...DEFAULT_OPTS,
    ...opts,
    path: `/${NAMESPACE}${path}`,
    headers: {
      ...DEFAULT_HEADERS,
      ...opts.headers || {}
    }
  });
}

function checkDB() {
  return request({ method: 'HEAD' });
}

function createDB() {
  return request({ method: 'PUT' });
}

async function initialize() {
  let response;
  try {
    response = await checkDB();
  } catch (err) {
    if (err.statusCode === 404) {
      response = await createDB();
    } else {
      throw err;
    }
  }

  return response;
}

module.exports = {
  request,
  initialize,
  checkDB,
  createDB
};
