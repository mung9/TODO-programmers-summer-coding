import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { isOverdue } from "../../util/date";

import PriorityCircle from "../commons/PriorityCircle";
import TodoContent from "./TodoContent";
import { deleteTodo, editTodo, nextPriority, toggleDone } from "../../actions/todoActions";

class TodoItem extends Component {
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
    const { todo, todos, onDeleteTodo, onNextPriority, onEditTodo } = this.props;
    const { todoBeingEdited } = this.state;
    return (
      <TodoItemTop
        todo={todo}
        todos={todos}
        onDelete={onDeleteTodo}
        onPriorityChange={onNextPriority}
        onToggleEdit={this.handleToggleEdit}  
        onEdit={onEditTodo}
        todoBeingEdited={todoBeingEdited}
      />
    );
  };

  render() {
    const { todo, todos, onToggleDone } = this.props;
    const className = "todo-item " + (todo.done ? "done" : "");
    return (
      <li
        className={className}
        value={todo.id}
        onClick={() => onToggleDone(todo._id, todos)}
      >
        {this.renderTop()}
        <TodoContent
          todoBeingEdited={this.state.todoBeingEdited}
          todo={todo}
          onTodoChange={this.handleTodoChange}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  todoBeingEdited: PropTypes.bool
};

TodoItem.defaultProps = {
  todoBeingEdited: null
};

const TodoItemTop = ({
  todo,
  todos,
  onDelete,
  onPriorityChange,
  onToggleEdit,
  onEdit,
  todoBeingEdited
}) => {
  return (
    <div className="todo-item-top">
      <div className="todo-item-control-buttons">
        <a>
          <FontAwesomeIcon
            className="todo-item-control-button"
            icon="trash"
            onClick={e => {
              e.stopPropagation();
              onDelete(todo._id, todos);
            }}
          />
        </a>
        {todoBeingEdited ? (
          <>
            <a>
              <FontAwesomeIcon
                icon="check"
                onClick={e => {
                  if (todoBeingEdited.title) {
                    onEdit(todoBeingEdited, todos);
                    onToggleEdit();
                  }
                  e.stopPropagation();
                }}
                className={`todo-item-control-button ${
                  todoBeingEdited.title ? "" : "fa-disabled"
                }`}
              />
            </a>
            <a>
              <FontAwesomeIcon
                className="todo-item-control-button"
                icon="times"
                onClick={e => {
                  onToggleEdit();
                  e.stopPropagation();
                }}
              />
            </a>
          </>
        ) : (
          <a>
            <FontAwesomeIcon
              className="todo-item-control-button"
              icon={"pen"}
              onClick={e => {
                onToggleEdit();
                e.stopPropagation();
              }}
            />
          </a>
        )}
      </div>
      <div className="notification">
        <PriorityCircle
          item={todo}
          onPriorityChange={()=>onPriorityChange(todo._id, todos)}
          showLabel={false}
        />
        {todo.due && isOverdue(todo.due) && !todo.done ? (
          <FontAwesomeIcon
            className="todo-item-control-button"
            icon="exclamation-triangle"
            className="warning"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  onDeleteTodo: (id, originalTodos) => dispatch(deleteTodo(id, originalTodos)),
  onEditTodo: (todo, originalTodos) => dispatch(editTodo(todo, originalTodos)),
  onNextPriority: (id, originalTodos) => dispatch(nextPriority(id, originalTodos)),
  onToggleDone: (id, originalTodos) => dispatch(toggleDone(id, originalTodos))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
