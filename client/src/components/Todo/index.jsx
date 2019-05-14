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
import "./todo.css";

export default class Todo extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    const todos = this.getTodos();
    this.setState({ todos });
  }

  setDone = todo => {};

  getTodos = () => {
    return fakeTodos;
  };

  render() {
    const { todos } = this.state;
    return (
      <section className="container">
        <TodoList todos={todos} />
      </section>
    );
  }
}

const fakeTodos = [
  {
    id: 1,
    title: "First",
    content: "hello",
    due: new Date(2019, 4, 16),
    priority: 1,
    done: false
  },
  {
    id: 2,
    title: "Second",
    content: "Sunrise",
    due: new Date(2019, 5, 3),
    priority: 2,
    done: false
  },
  {
    id: 3,
    title: "Third",
    content: "Dawn",
    due: new Date(2019, 3, 22),
    priority: 1,
    done: true
  },
  {
    id: 4,
    title: "양치질하고 세수하기",
    content: "오늘 안하면 나의 건강은 더욱 악화된다.",
    due: new Date(2019, 3, 22),
    priority: 1,
    done: false
  },
  {
    id: 5,
    title: "밥먹으면서 유튜브 보지 말기",
    content: "한 순간에 하나에만 집중하자.",
    due: new Date(2019, 3, 22),
    priority: 1,
    done: false
  }
];