const path = require('path');
const globby = require('globby');
const got = require('got');

async function uploadDesignDocs() {
  const files = await globby(['design/*.json'])

  files.forEach(async (file) => {
    const response = await got('http://localhost:5984/keeper/_design/test', {
      method: 'PUT',
      body: require(`./${file}`),
      json: true,
    });
  });
}

module.exports = uploadDesignDocs;

if (!module.parent) {
  uploadDesignDocs();
}
