const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const now = new Date();
const minDate = new Date(now);
minDate.setFullYear(now.getFullYear() - 50);
const maxDate = new Date();
maxDate.setFullYear(now.getFullYear() + 50);

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: true,
  },
  content: {
    type: String,
    maxlength: 100,
    required: false,
    default: ''
  },
  due: {
    type: Date,
    required: false,
    default: null
  },
  done: {
    type: Boolean,
    required: false,
    default: false
  },
  regDate:{
    type: Date,
    default: Date.now()
  }
});

const Todo = mongoose.model('Todo', todoSchema);

function validate(todo) {
  const schema = {
    _id: Joi.objectId(),
    title: Joi.string().max(50).required(),
    content: Joi.string().max(100).default(''),
    due: Joi.date(),
    done: Joi.boolean().default(false),
    regDate: Joi.date().default(Date.now()),
  };

  return Joi.validate(todo, schema);
}

module.exports = exports = {
  Todo,
  validateTodo: validate
};