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

class DB {
  constructor(options={}) {
    this.headers = { ...DEFAULT_HEADERS, ...options.headers || {} };
    this.namespace = options.namespace || NAMESPACE;
    this.requestOptions = { ...DEFAULT_OPTS, ...options.requestOptions || {} };
    this.isInitialized = false;
  }

  initialize() {
    return this.checkDB(false)
      .catch((err) => {
        if (err.statusCode === 404) return this.createDB(false);
        throw err;
      })
      .then(() => this.isInitialized = true);
  }

  checkDB(shouldInitialize) {
    return this.send({ method: 'HEAD' }, shouldInitialize);
  }

  createDB(shouldInitialize) {
    return this.send({ method: 'PUT' }, shouldInitialize);
  }

  getHeaders(headers={}) {
    return {...this.headers, ...headers};
  }

  send(options={}, shouldInitialize=true) {
    const compiledOptions = {
      ...this.requestOptions,
      ...options,
      path: `/${this.namespace}/${options.path || ''}`,
      headers: this.getHeaders(options.headers)
    };

    if (!this.isInitialized && shouldInitialize) {
      return this.initialize().then(() => got(compiledOptions));
    }

    return got(compiledOptions);
  }
}

const db = new DB();

module.exports = { DB, db };
