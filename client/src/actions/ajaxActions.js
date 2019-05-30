import * as actionTypes from "./types";

export function requestGetTodos() {
  return {
    type: actionTypes.REQ_GET_TODOS
  };
}

export function requestPostTodo(todo) {
  return {
    type: actionTypes.REQ_POST_TODO,
    todo
  };
}

export function requestDeleteTodo(id) {
  return {
    type: actionTypes.REQ_DELETE_TODO,
    id
  };
}

export function requestPutTodo(todo) {
  return {
    type: actionTypes.REQ_PUT_TODO,
    todo
  };
}

export function setTodos(todos) {
  return {
    type: actionTypes.SET_TODOS,
    todos
  };
}

export function addTodo(todo) {
  return {
    type: actionTypes.ADD_TODO,
    todo
  };
}

export function removeTodo(id) {
  return {
    type: actionTypes.REMOVE_TODO,
    id
  };
}

export function updateTodo(todo) {
  return {
    type: actionTypes.UPDATE_TODO,
    todo
  };
}

export function setError(error) {
  return {
    type: actionTypes.SET_ERROR,
    error
  };
}

export function rollback(originalTodos) {
  return {
    type: actionTypes.ROLLBACK,
    originalTodos
  };
}
