const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/fa/v1"], {
      target: "http://api.aparat.com",
    })
  );
};
