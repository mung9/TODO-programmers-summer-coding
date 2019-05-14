const express = require("express");
const app = express();
const path = require("path");

let outputDir = path.join(
  __dirname,
  "client",
  process.env.NODE_ENV === "production" ? "build" : "public"
);

app.use(express.static(outputDir));
app.use("*", (req, res) => {
  res.sendFile(path.join(outputDir, "index.html"));
});

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`🔥 Start listening on port ${port}`);
});

