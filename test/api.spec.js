describe('index Controller', () => {
  it('should return something', async () => {
    const response = await request({ url: '/' });
    expect(response.statusCode).toBe(200);
  });
});
