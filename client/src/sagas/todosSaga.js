import { takeEvery, put, call, select } from "redux-saga/effects";

import * as ajaxActions from "../actions/ajaxActions";
import * as actionTypes from "../actions/types";
import * as todoService from "../services/service";

const getOriginalTodos = state => state.todos;

function* handleGetTodos() {
  try {
    const { data: todos } = yield call(todoService.getTodos);
    yield put(ajaxActions.setTodos(todos));
  } catch (error) {
    yield put(ajaxActions.setError(error.toString()));
  }
}

function* handlePostTodo(action) {
  try {
    const { data: todo } = yield call(todoService.postTodo, action.todo);
    yield put(ajaxActions.addTodo(todo));
  } catch (error) {
    yield put(ajaxActions.setError(error.toString()));
  }
}

function* handlePutTodo(action) {
  const originalTodos = yield select(getOriginalTodos);
  try {
    yield put(ajaxActions.updateTodo(action.todo));
    yield todoService.putTodo(action.todo);
  } catch (error) {
    yield put(ajaxActions.setError(error));
    yield put(ajaxActions.rollback(originalTodos));
  }
}

function* handleDeleteTodo(action) {
  const originalTodos = yield select(getOriginalTodos);
  try {
    yield put(ajaxActions.removeTodo(action.id));
    yield call(todoService.deleteTodo, action.id);
  } catch (error) {
    yield put(ajaxActions.setError(error));
    yield put(ajaxActions.rollback(originalTodos));
  }
}

export default function* watchTodosRequest() {
  yield takeEvery(actionTypes.REQ_GET_TODOS, handleGetTodos);
  yield takeEvery(actionTypes.REQ_POST_TODO, handlePostTodo);
  yield takeEvery(actionTypes.REQ_DELETE_TODO, handleDeleteTodo);
  yield takeEvery(actionTypes.REQ_PUT_TODO, handlePutTodo);
}
