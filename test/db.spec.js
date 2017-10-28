const { DB } = require('../api/db');

describe('DB :', () => {

  describe('initialize :', async () => {
    it('should ensure that the keeper db is created', async () => {
      let db = new DB();
      db.namespace = `test-${db.namespace}`;
      expect(db.isInitialized).toBe(false);
      await db.initialize();
      expect(db.isInitialized).toBe(true);
    });
  });

  describe('send :', () => {
    it('should call initialize if the db has not been initialized', async () => {
      let db = new DB();
      db.namespace = `test-${db.namespace}`;
      expect(db.isInitialized).toBe(false);
      await db.send();
      expect(db.isInitialized).toBe(true);
    });
  });
});
