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
import TodoList from "./TodoList";
import FixedDashboard from "./FixedDashboard";
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";

import "./todo.css";

import { requestGetTodos } from "../../actions/ajaxActions";

class Todo extends Component {
  componentDidMount() {
    this.props.onGetTodos();
  }

  handleToggleDashboard = () => {
    const dashboardOpen = !this.state.dashboardOpen;
    this.setState({ dashboardOpen });
  };

  handleAddTodo = targetTodo => {
    this.props.onPostTodo(targetTodo);
  };

  render() {
    const { todos } = this.props;
    return (
      <section className="container">
        <NewTodoForm onAdd={this.handleAddTodo} />
        <TodoList todos={todos} />
        <FixedDashboard todos={todos} />
      </section>
    );
  }
}

const mapStateToProps = state => ({ todos: state.todos });

const mapDispatchToProps = dispatch => ({
  onGetTodos: ()=>dispatch(requestGetTodos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
