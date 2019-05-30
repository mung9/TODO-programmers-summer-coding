import {
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  ROLLBACK,
  REQ_POST_TODO,
  REQ_GET_TODOS,
  REQ_DELETE_TODO,
  REQ_PUT_TODO
} from "../actions/types";

const defaultState = [];

function alertAndLogError(error) {
  console.error(error);
  error.alertMessage && alert(error.alertMessage);
}

export default function(todos = defaultState, action) {
  switch (action.type) {
    case REQ_GET_TODOS:
    case REQ_POST_TODO:
    case REQ_DELETE_TODO:
    case REQ_PUT_TODO:
      return todos;
    case SET_TODOS:
      return action.todos;
    case ADD_TODO:
      return [...todos, action.todo];
    case UPDATE_TODO:
      return todos.map(todo =>
        todo._id === action.todo._id ? action.todo : todo
      );
    case REMOVE_TODO:
      return todos.filter(todo => todo._id !== action.id);
    case ROLLBACK:
      return action.originalTodos;
    default:
      return todos;
  }
}
