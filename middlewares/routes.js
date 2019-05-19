const staticRouter = require('../routes/static');
const todosRouter = require('../routes/todos');

module.exports = exports = function(app) {
  app.use(staticRouter);
  app.use('/api/todo',todosRouter);
}