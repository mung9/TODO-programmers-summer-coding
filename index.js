const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const todoRouter = require("./routes/todos");

app.use(cors());
require("./routes/static")(app);

app.use(express.json());
app.use("/api/todo", todoRouter);
require("./middlewares/error")(app);

mongoose
  .connect(config.database.url, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("🔥 connected to mongodb!"))
  .catch(err => console.log("Failed to connect to mongodb", err.message));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🔥 Start listening on port ${port}`);
});
