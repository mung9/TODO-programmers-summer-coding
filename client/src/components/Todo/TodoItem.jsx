import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        onEdit={()=>onEdit(todoBeingEdited)}
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
              maxLength={20}
            />
          ) : (
            <h3 className="todo-title">{todo.title}</h3>
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
              ref={prop => {
                this.textarea = prop;
              }}
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
                  onEdit();
                  onToggleEdit();
                  e.stopPropagation();
                }}
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
