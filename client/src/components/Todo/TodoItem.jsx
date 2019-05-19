import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PriorityCircle from "../commons/PriorityCircle";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoBeingEdited: null
    };
  }

  handleToggleEdit = () => {
    const todoBeingEdited = this.state.todoBeingEdited ? null : this.props.todo;
    this.setState({ todoBeingEdited });
  };

  handleTodoChange = ({ currentTarget }) => {
    const todoBeingEdited = { ...this.state.todoBeingEdited };
    todoBeingEdited[currentTarget.name] = currentTarget.value;
    this.setState({ todoBeingEdited });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.textarea) {
      this.textarea.style.height = 0;
      this.textarea.style.height = this.textarea.scrollHeight + "px";
    }
  }

  renderTop = () => {
    const { todo, onDelete, onPriorityChange, onEdit } = this.props;
    const { todoBeingEdited } = this.state;
    return (
      <TodoItemTop
        todo={todo}
        onDelete={onDelete}
        onPriorityChange={onPriorityChange}
        onToggleEdit={this.handleToggleEdit}
        onEdit={() => onEdit(todoBeingEdited)}
        todoBeingEdited={todoBeingEdited}
      />
    );
  };

  renderContent = () => {
    const { todoBeingEdited } = this.state;
    const { todo } = this.props;
    return (
      <div className="content">
        {/* Header Begin */}
        <div className="content-header">
          {todoBeingEdited ? (
            <input
              className="input-title"
              type="text"
              name="title"
              value={todoBeingEdited.title}
              onChange={this.handleTodoChange}
              maxLength={50}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <>
              <h3 className="todo-title">{todo.title}</h3>
              {todo.due ? (
                <p className="due">{`~${todo.due.getFullYear()}.${todo.due.getMonth()}.${todo.due.getDate()}`}</p>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {/* Header End */}
        {/* Body Begin */}
        <div className="content-body">
          {todoBeingEdited ? (
            <textarea
              className="input-content"
              type="text"
              name="content"
              value={todoBeingEdited.content}
              onChange={this.handleTodoChange}
              maxLength={500}
              ref={prop => {
                this.textarea = prop;
              }}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <p className="todo-content">{todo.content}</p>
          )}
        </div>
        {/* Body End */}
      </div>
    );
  };

  render() {
    const { todo, onToggleDone } = this.props;
    const className = "todo-item " + (todo.done ? "done" : "");
    return (
      <li
        className={className}
        value={todo.id}
        onClick={() => onToggleDone(todo)}
      >
        {this.renderTop()}
        {this.renderContent()}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  todoBeingEdited: PropTypes.bool
};

TodoItem.defaultProps = {
  todoBeingEdited: null
};

function TodoItemTop({
  todo,
  onDelete,
  onPriorityChange,
  onToggleEdit,
  onEdit,
  todoBeingEdited
}) {
  return (
    <div className="todo-item-top">
      <div className="control-buttons">
        <a>
          <FontAwesomeIcon
            icon="trash"
            onClick={e => {
              onDelete(todo);
              e.stopPropagation();
            }}
          />
        </a>
        <a>
          {todoBeingEdited ? (
            <>
              <FontAwesomeIcon
                icon="check"
                onClick={e => {
                  if (todoBeingEdited.title) {
                    onEdit();
                    onToggleEdit();
                  }
                  e.stopPropagation();
                }}
                className={todoBeingEdited.title ? "" : "fa-disabled"}
              />
              <FontAwesomeIcon
                icon="times"
                onClick={e => {
                  onToggleEdit();
                  e.stopPropagation();
                }}
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon={todoBeingEdited ? "check" : "pen"}
              onClick={e => {
                onToggleEdit();
                e.stopPropagation();
              }}
            />
          )}
        </a>
      </div>
      <div className="notification">
        {todo.due && isOverdue(todo.due) && !todo.done ? (
          <FontAwesomeIcon icon="exclamation-triangle" className="warning" />
        ) : (
          ""
        )}
        <PriorityCircle
          item={todo}
          onPriorityChange={onPriorityChange}
          showLabel={false}
        />
      </div>
    </div>
  );
}

function isOverdue(due) {
  const endOfToday = new Date();
  endOfToday.setDate(endOfToday.getDate() + 1);

  return due.getTime() < endOfToday.getTime();
}
