const db = require('../api/db');
const uuid = require('uuid/v4');

describe('logins Controller :', () => {
  describe('/api/logins route GET:', () => {
    it('should respond successfully', async () => {
      const response = await request({ url: '/api/logins' });
      expect(response.statusCode).toBe(200);
    });

    it('should return a list of logins', async () => {
      const _id = uuid();
      await db.send({
        method: 'POST',
        body: { _id, meta_type: 'login' }
      });
      const response = await request({ url: '/api/logins' });
      const { data } = response.result;
      expect(data).not.toBe(undefined);
      expect(data).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: _id, type: 'login' })
      ]));
    });
  });
});
