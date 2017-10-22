const couch = require('mock-couch');
const DB = require('../api/db');
const path = require('path');

describe('DB :', () => {

  describe('initialize :', async () => {
    it('should ensure that the keeper db is created', async () => {
      await DB.initialize();
      // expect(DB.getDB).toHaveBeenCalled();
      // expect(DB.createDB).toHaveBeenCalled();
    });
  });

  describe('request :', () => {
    it('should handle a 404 database not found error', async () => {
      // spyOn(db, 'got').and.returnValue(Promise.reject({
      //   statusCode: 404,
      //   statusMessage: 'Not Found'
      // }));
      let response;
      try {
        response = await DB.request();
      } catch(err) {
        console.log(err);
      }
    });
  });
});
