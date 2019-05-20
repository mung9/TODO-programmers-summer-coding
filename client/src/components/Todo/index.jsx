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
  getTodos,
  postTodo,
  putTodo,
  deleteTodo
} from "../../services/service";
import TodoList from "./TodoList";
import FixedDashboard from './FixedDashboard';
import { nextPriorityOf } from "../commons/priority";
import NewTodoForm from "./NewTodoForm";

import "./todo.css";

export default class Todo extends Component {
  state = {
    todos: [],
    dashboardOpen: false
  };

  async componentDidMount() {
    let { data: todos } = await getTodos();
    todos = _.orderBy(todos, ["priority", "regDate"]).reverse();
    this.setState({ todos });
  }

  handleToggleDashboard = () => {
    const dashboardOpen = !this.state.dashboardOpen;
    this.setState({ dashboardOpen });
  };

  handleAddTodo = async targetTodo => {
    try {
      const { data: todo } = await postTodo(targetTodo);
      const todos = [...this.state.todos];
      todos.push(todo);
      this.setState({ todos });
    } catch (error) {
      console.error(error);
      alert(`[${targetTodo.title}]를 추가하는데 실패했습니다.`);
    }
  };

  handleToggleDone = async targetTodo => {
    const originTodos = this.state.todos;
    const todos = [...originTodos];
    const index = todos.findIndex(todo => todo._id === targetTodo._id);
    if (index === -1) {
      return console.error(`${_id}를 id로 가지는 todo가 존재하지 않음.`);
    }

    const todo = { ...todos[index] };
    todo.done = !todo.done;

    todos[index] = todo;
    this.setState({ todos });

    // Optimistic Update
    try {
      await putTodo(todo);
    } catch (error) {
      console.error(error);
      alert(`[${targetTodo.title}] 수정을 실패했습니다.`);
      this.setState({ todos: originTodos });
    }
  };

  handlePriorityChange = async targetTodo => {
    const originTodos = this.state.todos;
    const todos = [...originTodos];
    const index = todos.findIndex(todo => todo._id === targetTodo._id);
    if (index == -1) {
      return console.error(`${_id}를 id로 가지는 todo가 존재하지 않음.`);
    }

    const todo = { ...todos[index] };
    todo.priority = nextPriorityOf(todo.priority);
    todos[index] = todo;

    this.setState({ todos });

    // Optimistic Update
    try {
      await putTodo(todo);
    } catch (error) {
      console.error(error);
      alert(`[${todo.title}] 수정을 실패했습니다.`);
      this.setState({ todos: originTodos });
    }
  };

  handleDeleteDone = async () => {
    const originTodos = this.state.todos;
    const todos = [];
    const targetTodos = [];
    originTodos.forEach((todo)=>{
      todo.done? targetTodos.push(todo) : todos.push(todo);
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

    const originTodos = this.state.todos;
    const todos = [...originTodos];
    const index = todos.findIndex(todo => todo._id === targetTodo._id);
    if (index === -1) {
      return console.error(`${_id}를 id로 가지는 todo가 존재하지 않음.`);
    }

    todos.splice(index, 1);
    this.setState({ todos });

    // Optimistic Update
    try {
      await deleteTodo(targetTodo._id);
    } catch (error) {
      console.error(error);
      alert(`[${targetTodo.title}] 삭제를 실패했습니다.`);
      this.setState({ todos: originTodos });
    }
  };

  handleEdit = async targetTodo => {
    const originTodos = this.state.todos;
    const todos = [...originTodos];
    const index = todos.findIndex(todo => todo._id === targetTodo._id);
    if (-1 === index)
      return console.error(`${_id}를 id로 가지는 todo가 존재하지 않음.`);

    todos[index] = { ...targetTodo };
    this.setState({ todos });

    // Optimistic Update
    try {
      await putTodo(todos[index]);
    } catch (error) {
      alert(`[${todos[index].title}]를 수정하는 도중 오류가 발생하였습니다.`);
      console.error(error);
      this.setState({ todos: originTodos });
    }
  };

  render() {
    const { todos, dashboardOpen } = this.state;
    return (
      <section className="container">
        <NewTodoForm onAdd={this.handleAddTodo} />
        <TodoList
          todos={todos}
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

