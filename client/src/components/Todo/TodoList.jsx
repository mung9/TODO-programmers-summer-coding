import React from "react";
import TodoItem from './TodoItem';
import PropTypes from "prop-types";

export default function TodoList({
  todos,
  onToggleDone,
  onDelete,
  onEdit,
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
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired
};
