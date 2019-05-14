import React from "react";
import PropTypes from "prop-types";

export default function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

TodoList.prototype = {
  todos: PropTypes.array
};

function TodoItem({ todo }) {
  const className = "todo-item " + (todo.done ? "done" : "");
  return (
    <li className={className} value={todo.id}>
      <TodoItemController todo={todo} />
      <div className="content">
        <div className="header">
          <h3 className="todo-title">{todo.title}</h3>
          <span>{isOverdue(todo.due) && !todo.done ? "⚠️" : null}</span>
        </div>
        <p className="todo-content">{todo.content}</p>
        <p className="todo-done">{todo.done}</p>
      </div>
    </li>
  );
}

function TodoItemController({ todo }) {
  return <div className="todo-item-controller">𝗫</div>;
}

function isOverdue(due) {
  const today = new Date();
  return due.getTime() < today.getTime();
}
