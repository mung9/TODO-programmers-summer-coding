import React from "react";
import TodoItem from './TodoItem';
import PropTypes from "prop-types";

export default function TodoList({
  todos,
  onToggleDone,
  onDelete,
  onModify,
  onPriorityChange
}) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func,
  onPriorityChange: PropTypes.func.isRequired
};
