import * as actionTypes from './types';

export function requestGetTodos(){
  return {
    type: actionTypes.REQ_GET_TODOS
  }
}

export function requestPostTodo(todo){
  return  {
    type: actionTypes.REQ_POST_TODO,
    todo
  }
}

export function requestDeleteTodo(id){
  return  {
    type: actionTypes.REQ_DELETE_TODO,
    id
  }
}

export function setTodos(todos){
  return{
    type: actionTypes.SET_TODOS,
    todos
  }
}

export function addTodo(todo){
  return{
    type: actionTypes.ADD_TODO,
    todo
  }
}

export function removeTodo(id){
  return {
    type: actionTypes.REMOVE_TODO,
    id
  }
}

export function setError(error){
  return {
    type: actionTypes.SET_ERROR,
    error
  }
}

export function rollback(originalTodos){
  return {
    type: actionTypes.ROLLBACK,
    originalTodos
  }
}