/*
○ 새로운 TODO(제목과 내용)를 작성할 수 있다.
○ TODO 목록을 볼 수 있다.
○ TODO 항목의 제목과 내용을 수정할 수 있다.
○ TODO 항목을 삭제할 수 있다.
○ 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.
○ TODO 항목의 우선순위를 설정 및 조절할 수 있다.
○ TODO 항목에 대한 완료 처리를 할 수 있다.
○ 마감기한이 지난 TODO에 대해 알림을 노출할 수 있다. 
*/

import React, { Component } from "react";
import {
  // getTodos,
  // postTodo,
  // putTodo,
  // deleteTodo
} from "../../services/service";
import TodoList from "./TodoList";
import FixedDashboard from "./FixedDashboard";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";

import {
  getTodos,
  postTodo,
  editTodo,
  deleteTodo,
  printSomething,
  nextPriority,
  toggleDone
} from "../../actions/todoActions";

import "./todo.css";

class Todo extends Component {
  state = {
    todos: [],
    dashboardOpen: false
  };

  componentDidMount() {
    this.props.onPrintSomething();
    this.props.onGetTodos();
  }

  handleToggleDashboard = () => {
    const dashboardOpen = !this.state.dashboardOpen;
    this.setState({ dashboardOpen });
  };

  handleAddTodo = targetTodo => {
    this.props.onPostTodo(targetTodo);
  };

  handleToggleDone = targetTodo => {
    this.props.onToggleDone(targetTodo._id, this.props.todos);
  };

  handlePriorityChange = targetTodo => {
    this.props.onNextPriority(targetTodo._id, this.props.todos);
  };

  handleDeleteDone = async () => {
    const originTodos = this.state.todos;
    const todos = [];
    const targetTodos = [];
    originTodos.forEach(todo => {
      todo.done ? targetTodos.push(todo) : todos.push(todo);
    });

    if (targetTodos.length === 0) return;

    const yes = window.confirm(
      `${targetTodos.length}개의 완료된 작업을 정말 삭제하시겠습니까?`
    );
    if (!yes) return;

    this.setState({ todos });

    // Optimistic Update
    try {
      await Promise.all(
        targetTodos.map(async todo => {
          await deleteTodo(todo._id);
        })
      );
    } catch (error) {
      console.error(error);
      alert(`완료한 할 일을 삭제하지 못했습니다.`);
      this.setState({ todos: originTodos });
    }
  };

  handleDelete = async targetTodo => {
    const yes = window.confirm(
      `[${targetTodo.title}] 를 정말 삭제하시겠습니까?`
    );
    if (!yes) return;

    this.props.onDeleteTodo(targetTodo._id, this.props.todos);
  };

  handleEdit = targetTodo => {
    this.props.onEditTodo(targetTodo, this.props.todos);
  };

  render() {
    const { todos, dashboardOpen } = this.state;
    return (
      <section className="container">
        <NewTodoForm onAdd={this.handleAddTodo} />
        <TodoList
          todos={this.props.todos}
          onToggleDone={this.handleToggleDone}
          onDelete={this.handleDelete}
          onPriorityChange={this.handlePriorityChange}
          onEdit={this.handleEdit}
        />
        <FixedDashboard
          todos={todos}
          open={dashboardOpen}
          onToggleDashboard={this.handleToggleDashboard}
          onDeleteDone={this.handleDeleteDone}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({ todos: state.todos });

const mapActionsToProps = {
  onGetTodos: getTodos,
  onEditTodo: editTodo,
  onPostTodo: postTodo,
  onDeleteTodo: deleteTodo,
  onPrintSomething: printSomething,
  onNextPriority: nextPriority,
  onToggleDone: toggleDone
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
  mergeProps
)(Todo);
