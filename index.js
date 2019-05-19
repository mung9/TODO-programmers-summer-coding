const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const config = require("config");

app.use(cors());
app.use(express.json());

require("./middlewares/routes")(app);
require("./middlewares/error")(app);

app.use(helmet());
app.use(compression());

// database 연결
const dbUrl =
  process.env.NODE_ENV === "production"
    ? config.get("database.url")
    : "mongodb://localhost/todo";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("🔥 Connected to mongodb!"))
  .catch(err => console.log(`☠️ Failed to connect to mongodb: [${dbUrl}]`, err.message));

// 리스닝 시작
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🔥 Start listening on port ${port}`);
});
