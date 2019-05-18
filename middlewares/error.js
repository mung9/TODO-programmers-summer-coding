module.exports = exports = function (app) {
  app.use((err, req, res, next) => {
    console.error('❌  error!!!\n',err);
    res.status(500).send('SOMETHING FAILED');
  });
}