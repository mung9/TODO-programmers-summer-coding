import * as todoService from "../services/service";
import {
  REQ_POST_TODO,
  REQ_GET_TODOS,
  PUT_TODO,
  DELETE_TODO,
  PRINT_SOMETHING,
  PUT_TODO_ERROR,
  DELETE_TODO_ERROR,
  GET_TODOS_ERROR,
  POST_TODO_ERROR,
  DELETE_DONE,
  DELETE_DONE_ERROR
} from "./types";

import { nextPriorityOf } from "../components/commons/priority";

export function postTodo(todo) {
  return async dispatch => {
    try {
      const { data: newTodo } = await todoService.postTodo(todo);
      dispatch({
        type: REQ_POST_TODO,
        todo: newTodo
      });
    } catch (error) {
      error.alertMessage = `[${targetTodo.title}]를 추가하는데 실패했습니다.`;
      dispatch({ type: POST_TODO_ERROR, error });
    }
  };
}

export function printSomething() {
  return {
    type: PRINT_SOMETHING,
    payload: "This is my message"
  };
}

export function getTodos() {
  return async dispatch => {
    try {
      const { data: todos } = await todoService.getTodos();
      dispatch({
        type: REQ_GET_TODOS,
        todos
      });
    } catch (error) {
      error.alertMessage = `할 일을 정상적으로 가져오지 못 했습니다.`;
      dispatch({ type: GET_TODOS_ERROR, error });
    }
  };
}

export function editTodo(todo, originalTodos) {
  return async dispatch => {
    dispatch({ type: PUT_TODO, todo });
    try {
      await todoService.putTodo(todo);
    } catch (error) {
      error.alertMessage = `[${todo.title}]을 수정하지 못 했습니다.`;
      dispatch({ type: PUT_TODO_ERROR, originalTodos, error });
    }
  };
}

export function nextPriority(id, originalTodos) {
  return async dispatch => {
    const todo = { ...originalTodos.find(t => t._id === id) };
    todo.priority = nextPriorityOf(todo.priority);
    dispatch({ type: PUT_TODO, todo });
    try {
      await todoService.putTodo(todo);
    } catch (error) {
      error.alertMessage = `[${todo.title}]의 우선순위를 변경하지 못 했습니다.`;
      dispatch({ type: PUT_TODO_ERROR, originalTodos, error });
    }
  };
}

export function toggleDone(id, originalTodos) {
  return async dispatch => {
    const todo = { ...originalTodos.find(t => t._id === id) };
    todo.done = !todo.done;
    dispatch({ type: PUT_TODO, todo });
    try {
      await todoService.putTodo(todo);
    } catch (error) {
      error.alertMessage = `[${todo.title}]을 완료처리하지 못 했습니다.`;
      dispatch({ type: PUT_TODO_ERROR, originalTodos, error });
    }
  };
}

export function deleteTodo(id, originalTodos) {
  return async dispatch => {
    const result = confirm("정말로 삭제하시겠습니까?");
    if (!result) return;
    dispatch({ type: DELETE_TODO, id });
    try {
      await todoService.deleteTodo(id);
    } catch (error) {
      error.alertMessage = `할 일을 삭제하지 못 했습니다.`;
      dispatch({ type: DELETE_TODO_ERROR, originalTodos, error });
    }
  };
}

export function deleteDone(originalTodos) {
  return async dispatch => {
    const result = confirm("완료된 할 일을 모두 삭제하시겠습니까?");
    if (!result) return;

    dispatch({ type: DELETE_DONE });
    try {
      console.log("todos:", originalTodos);
      await Promise.all(
        originalTodos
          .filter(todo => todo.done)
          .map(async todo => await todoService.deleteTodo(todo._id))
      );
    } catch (error) {
      error.alertMessage = `완료된 할 일을 삭제하지 못 했습니다.`;
      dispatch({ type: DELETE_DONE_ERROR, originalTodos, error });
    }
  };
}
