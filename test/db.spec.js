const { DB, db } = require('../api/db');

describe('DB :', () => {

  describe('initialize :', async () => {
    it('should ensure that the keeper db is created', async () => {
      let response = await db.send();
      console.log(response.body);
      await db.initialize();
      // expect(DB.getDB).toHaveBeenCalled();
      // expect(DB.createDB).toHaveBeenCalled();
    });
  });

  describe('send :', () => {
    it('should handle a 404 database not found error', async () => {
      // spyOn(db, 'got').and.returnValue(Promise.reject({
      //   statusCode: 404,
      //   statusMessage: 'Not Found'
      // }));
      let response;
      try {
        response = await db.send();
      } catch(err) {
        console.log(err);
      }
      // console.log(Object.keys(response));
      // console.log(response.body);
      // expect(true).toEqual(false);
    });
  });
});
