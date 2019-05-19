const path = require("path");
const express = require("express");
const router = express.Router();

const outputDir = path.join(
  __dirname,
  "../client",
  process.env.NODE_ENV === "production" ? "build" : "public"
);

router.get("*", (req, res, next) => {
  if(req.path==='/'){
    return res.sendFile(path.join(outputDir, "index.html"));
  } else {
    express.static(outputDir)(req,res,next);
  }
});

module.exports = exports = router;