function asyncMiddleware(handler) {
  return function(req, res, next) {
    try {
      return handler(req,res,next);
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = exports = () => {};
