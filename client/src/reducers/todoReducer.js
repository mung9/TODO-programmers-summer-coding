import {
  POST_TODO,
  POST_TODO_ERROR,
  GET_TODOS,
  GET_TODOS_ERROR,
  PUT_TODO,
  PUT_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_ERROR,
  DELETE_DONE,
  DELETE_DONE_ERROR,
  PRINT_SOMETHING
} from "../actions/types";

const defaultState = [];

function alertAndLogError(error) {
  console.error(error);
  error.alertMessage && alert(error.alertMessage);
}

export default function(todos = defaultState, action) {
  switch (action.type) {
    case GET_TODOS:
      return action.todos;
    case GET_TODOS_ERROR:
    case POST_TODO_ERROR:
      alertAndLogError(action.error);
      return;
    case POST_TODO:
      return [...todos, action.todo];
      return;
    case PUT_TODO:
      if (!action.todo) {
        console.error("`action` 객체에 `todo`필드가 없습니다.");
      }
      return todos.map(todo =>
        todo._id === action.todo._id ? action.todo : todo
      );
    case PUT_TODO_ERROR:
      alertAndLogError(action.error);
      return action.originalTodos
        ? action.originalTodos
        : console.error("`originalTodos`필드가 없습니다.");
    case DELETE_TODO:
      return todos.filter(todo => {
        return todo._id !== action.id;
      });
    case DELETE_TODO_ERROR:
      alertAndLogError(action.error);
      return action.originalTodos
        ? action.originalTodos
        : console.error("`originalTodos`필드가 없습니다.");
    case DELETE_DONE:
      return todos.filter(todo => !todo.done);
    case DELETE_DONE_ERROR:
      alertAndLogError(action.error);
      return action.originalTodos
        ? action.originalTodos
        : console.error("`originalTodos`필드가 없습니다.");
    case PRINT_SOMETHING:
      console.log("PRINT_SOMETHING!!");
      return todos;
    default:
      return todos;
  }
}
