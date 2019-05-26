const express = require("express");
const _ = require("lodash");
const { Todo, validateTodo } = require("../models/todo");
const validateId = require("../models/id");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  return res.send(todos);
});

router.get("/:id", async (req, res) => {
  const { err: error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(400).send("Todo with given id does not exist.");

  return res.send(todo);
});

router.post("/", async (req, res) => {
  let todo = _.pick(req.body, [
    "title",
    "content",
    "due",
    "priority",
    "done",
    "regDate"
  ]);
  const { error } = validateTodo(todo);
  if (error) return res.status(400).send(error.details[0].message);

  todo = await new Todo(todo).save();
  console.log('saved todo:',todo);
  res.send(todo);
});

router.put("/:id", async (req, res) => {
  let { error: isInvalidId } = validateId(req.params.id);
  if (isInvalidId) return res.status(400).send(isInvalidId.details[0].message);

  let todo = _.pick(req.body, ["title", "content", "due", "done", 'priority', 'regDate']);
  const { error: isInvalidTodo } = validateTodo(todo);
  if (isInvalidTodo) {
    return res.status(400).send(isInvalidTodo.details[0].message);
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, todo);
  if (!todo) return res.status(400).send("Todo with given id does not exist.");

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(400).send("Todo with given id does not exist.");

  res.send(todo);
});

module.exports = exports = router;
