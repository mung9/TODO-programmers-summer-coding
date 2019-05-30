import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isOverdue } from "../../util/date";
import PriorityCircle from "../commons/PriorityCircle";
import TodoContent from "./TodoContent";
import { requestDeleteTodo, requestPutTodo } from "../../actions/ajaxActions";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoBeingEdited: null
    };
  }

  handleToggleEdit = () => {
    const todoBeingEdited = this.state.todoBeingEdited
      ? null
      : { ...this.props.todo };
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

    console.log(prevProps.todo === this.props.todo);
    if (this.state.todoBeingEdited && prevProps.todo !== this.props.todo) {
      this.handleToggleEdit();
    }
  }

  renderTop = () => {
    const { todo, todos, onDeleteTodo, onUpdateTodo } = this.props;
    const { todoBeingEdited } = this.state;
    return (
      <TodoItemTop
        todo={todo}
        todos={todos}
        onDelete={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
        onToggleEdit={this.handleToggleEdit}
        todoBeingEdited={todoBeingEdited}
      />
    );
  };

  render() {
    const { todo, todos, onUpdateTodo } = this.props;
    const className = "todo-item " + (todo.done ? "done" : "");
    return (
      <li
        className={className}
        value={todo.id}
        onClick={() => onUpdateTodo({ ...todo, done: !todo.done })}
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

const DeleteButton = ({ todo, todos, onDelete }) => {
  return (
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
  );
};

const ControlButtonOnUsual = ({ onToggleEdit }) => {
  return (
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
  );
};

const ControlButtonOnEdit = ({
  todoBeingEdited,
  todos,
  onEdit,
  onToggleEdit
}) => {
  return (
    <>
      <a>
        <FontAwesomeIcon
          icon="check"
          onClick={e => {
            if (todoBeingEdited.title) {
              onEdit(todoBeingEdited, todos);
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
  );
};

const TodoItemTop = ({
  todo,
  todos,
  onDelete,
  onToggleEdit,
  onUpdateTodo,
  todoBeingEdited
}) => {
  return (
    <div className="todo-item-top">
      <div className="todo-item-control-buttons">
        <DeleteButton todo={todo} todos={todos} onDelete={onDelete} />
        {todoBeingEdited ? (
          <ControlButtonOnEdit
            todoBeingEdited={todoBeingEdited}
            todos={todos}
            onEdit={onUpdateTodo}
            onToggleEdit={onToggleEdit}
          />
        ) : (
          <ControlButtonOnUsual onToggleEdit={onToggleEdit} />
        )}
      </div>
      <div className="notification">
        <PriorityCircle
          item={todo}
          onPriorityChange={onUpdateTodo}
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
  onDeleteTodo: id => {
    confirm("정말로 삭제하시겠습니까?") && dispatch(requestDeleteTodo(id));
  },
  onUpdateTodo: todo => dispatch(requestPutTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
