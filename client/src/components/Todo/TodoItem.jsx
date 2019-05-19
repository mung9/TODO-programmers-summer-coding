import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from '../commons/Input';

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
            <Input
            name="title"
            value={todoBeingEdited.title}
            placeholder="새 TODO의 제목을 입력하세요."
            onChange={this.handleTodoChange}
            maxLength={50}
            focus="true"
            label="제목"
            onClick={e => e.stopPropagation()}
          />
          ) : (
            <>
              <h3 className="todo-title">{todo.title}</h3>
              {todo.due ? (
                <p className="due">{`~${todo.due.getFullYear()}.${todo.due.getMonth()+1}.${todo.due.getDate()}`}</p>
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
            <Input
            name="content"
            value={todoBeingEdited.content}
            placeholder="상세 내용을 입력하세요."
            onChange={this.handleTodoChange}
            maxLength={500}
            type="textarea"
            label="내용"
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
  const endOfTheDueDate = new Date(due);
  endOfTheDueDate.setDate(endOfTheDueDate.getDate() + 1);

  const now = new Date();

  return endOfTheDueDate.getTime() < now.getTime();
}