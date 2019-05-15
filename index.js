const express = require("express");
const app = express();
const path = require("path");

require('./routes/static')(app);
// app.get('/')

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🔥 Start listening on port ${port}`);
});