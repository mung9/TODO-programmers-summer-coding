import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TodoList({ todos, onToggleDone, onDelete, onModify }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggleDone={onToggleDone} onDelete={onDelete}/>
      ))}
    </ul>
  );
}

TodoList.prototype = {
  todos: PropTypes.array,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onModify: PropTypes.func
};

function TodoItem({ todo, onToggleDone, onDelete }) {
  const className = "todo-item " + (todo.done ? "done" : "");

  return (
    <li
      className={className}
      value={todo.id}
      onClick={() => onToggleDone(todo)}
    >
      <TodoItemTop todo={todo} onDelete={onDelete} />
      <div className="content">
        <div className="header">
          <h3 className="todo-title">{todo.title}</h3>
        </div>
        <p className="todo-content">{todo.content}</p>
        <p className="todo-done">{todo.done}</p>
      </div>
    </li>
  );
}

function TodoItemTop({ todo, onDelete }) {
  return (
    <div className="todo-item-top">
      <div className="control-buttons">
        <a>
          <FontAwesomeIcon icon="times" onClick={(e)=>{onDelete(todo); e.stopPropagation();}}/>
        </a>
        <a>
          <FontAwesomeIcon icon="pen" />
        </a>
      </div>
      <div className="notification">
        {isOverdue(todo.due) && !todo.done ? (
          <FontAwesomeIcon icon="exclamation-triangle" className="warning" />
        ) : (
          ""
        )}
        <FontAwesomeIcon
          icon="circle"
          className={`priority priority${todo.priority}`}
        />
      </div>
    </div>
  );
}

function isOverdue(due) {
  const today = new Date();
  return due.getTime() < today.getTime();
}
