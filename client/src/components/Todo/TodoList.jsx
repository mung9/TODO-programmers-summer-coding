import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import _ from "lodash";

export default function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list empty-todo-list">
        <span>🙂 할 일이 없네요! 🙃</span>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array
};
