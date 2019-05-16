import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isEditable: false
  };

  handleToggleEdit = () => {
    const isEditable = !this.state.isEditable;
    this.setState({ isEditable });
  };

  render() {
    const {
      todo,
      onPriorityChange,
      onToggleDone,
      onDelete,
      onToggleEdit
    } = this.props;
    const { isEditable } = this.state;
    const className = "todo-item " + (todo.done ? "done" : "");
    return (
      <li
        className={className}
        value={todo.id}
        onClick={() => onToggleDone(todo)}
      >
        <TodoItemTop
          todo={todo}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
          onToggleEdit={this.handleToggleEdit}
        />
        <div className="content">
          <div className="header">
            {isEditable ? (
              <input className="input-title" type="text" value={todo.title} />
            ) : (
              <h3 className="todo-title">{todo.title}</h3>
            )}
          </div>
          {isEditable ? (
            <input className="input-content" type="text" value={todo.content} />
          ) : (
            <p className="todo-content">{todo.content}</p>
          )}

          <p className="todo-done">{todo.done}</p>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  isEditable: PropTypes.bool
};

TodoItem.defaultProps = {
  isEditable: false
};

function TodoItemTop({ todo, onDelete, onPriorityChange, onToggleEdit }) {
  return (
    <div className="todo-item-top">
      <div className="control-buttons">
        <a>
          <FontAwesomeIcon
            icon="times"
            onClick={e => {
              onDelete(todo);
              e.stopPropagation();
            }}
          />
        </a>
        <a>
          <FontAwesomeIcon
            icon="pen"
            onClick={e => {
              onToggleEdit();
              e.stopPropagation();
            }}
          />
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
          onClick={e => {
            onPriorityChange(todo);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
}

function isOverdue(due) {
  const today = new Date();
  return due.getTime() < today.getTime();
}
