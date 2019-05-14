const express = require('express');
const _ = require('lodash');
const { Todo, validateTodo } = require('../models/todo');
const validateId = require('../models/id');

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  return res.send(todos);
});

router.get('/:id', async (req, res) => {
  const {err} = validateId(req.params.id);
  if(err) return res.status(400).send(err.details[0].message);

  const todo = await Todo.findById(req.params.id);
  if(!todo) return res.status(400).send('Todo with given id does not exist.')

  return res.send(todo);
});

router.post('/', async (req,res)=>{
  let todo = _.pick(req.body, ['title', 'content', 'due', 'done', 'regDate']);
  const {err} = validateTodo(todo);
  if(err) return res.status(400).send(err.details[0].message);

  todo = await (new Todo(todo)).save();
  res.send(todo);
});

router.put('/:id', async (req,res)=>{
  const {err} = validateId(req.params.id);
  if(err) return res.status(400).send(err.details[0].message);

  let todo = _.pick(req.body, ['title', 'content', 'due', 'done', 'regDate']);
  const {err} = validateTodo(todo);
  if(err) return res.status(400).send(err.details[0].message);

  todo = await Todo.findByIdAndUpdate(req.params.id, todo);
  if(!todo) return res.status(400).send('Todo with given id does not exist.');

  res.send(todo);
});

router.delete('/:id', async (req,res)=>{
  const {err} = validateId(req.params.id);
  if(err) return res.status(400).send(err.details[0].message);

  const todo = await Todo.findByIdAndDelete(req.params.id);
  if(!todo) return res.status(400).send('Todo with given id does not exist.');

  res.send(todo);
});


/************************* */
router.get('/:year/:month/:date?', async (req, res) => {
  const year = +req.params.year;
  const month = +req.params.month;
  if (!year || !month) return res.status(400).send('The given parameters are invalid.');

  const date = req.params.date && parseInt(req.params.date);

  const first = new Date(year, month - 1, date || 1);
  const end = new Date(year, month - 1, date ? date + 1 : 31);
  const todos = await Todo.find()
    .where('date')
    .gte(first)
    .lt(end)
    .sort({regDate: -1})
    .select('title date isCompleted');

  res.send(todos);
});

router.post('/', async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, date } = req.body;
  const todo = new Todo({ title, date, regDate: Date.now() });
  await todo.save();

  res.send(todo);
});

router.put('/:id', async (req, res) => {
  const { error: invalidIdErr } = validateId(req.params.id);
  if (invalidIdErr) return res.status(400).send(invalidIdErr.details[0].message);

  let todo = _.pick(req.body, ['title', 'date', 'isCompleted', 'updatedDate']);
  const { error: invalidTodoErr } = validateTodo(todo);
  if (invalidTodoErr) return res.status(400).send(invalidTodoErr.details[0].message);

  todo = await Todo.findByIdAndUpdate(req.params.id, todo);
  if (!todo) return res.status(404).send('The todo with given id was not found.');

  res.send(todo);
});

router.delete('/:id', async (req, res) => {
  const { error: invalidIdErr } = validateId(req.params.id);
  if (invalidIdErr) return res.status(400).send(invalidIdErr.details[0].message);

  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.send(todo);
});

module.exports = exports = router;