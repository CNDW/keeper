const got = require('got');

const DEFAULT_OPTS = {
  protocol: 'http:',
  hostname: 'localhost',
  port: process.env.COUCH_PORT || '5984',
  json: true
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
    this.DB = DB;
  }

  initialize() {
    return this.checkNamespace(false)
      .catch((err) => {
        if (err.statusCode === 404) return this.createNamespace(false);
        throw err;
      })
      .then(() => this.isInitialized = true);
  }

  checkNamespace(shouldInitialize) {
    return this.send({ method: 'HEAD' }, shouldInitialize);
  }

  createNamespace(shouldInitialize) {
    return this.send({ method: 'PUT' }, shouldInitialize);
  }

  deleteNamespace() {
    return this.send({ method: 'DELETE' });
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

module.exports = db;
