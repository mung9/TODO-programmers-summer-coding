const rateLimit = require("express-rate-limit");

module.exports = exports = function(app, url, seconds, max, handler, ...args) {
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.enable("trust proxy");

  const windowMs = seconds * 1000;
  const message =
    "너무 많은 요청을 하셨네요. 혹시 나쁜 의도가 있었던건 아닌가요? 😎";
  const limiter = rateLimit({ windowMs, max, message, handler, ...args });
  app.use(url || "/", limiter);
};
