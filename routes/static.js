const path = require('path');
const express = require('express');

module.exports = exports = function(app) {
  let outputDir = path.join(
    __dirname,
    "../client",
    process.env.NODE_ENV === "production" ? "build" : "public"
  );

  app.use(express.static(outputDir));
  app.use("/main", (req, res) => {
    res.sendFile(path.join(outputDir, "index.html"));
  });
};
