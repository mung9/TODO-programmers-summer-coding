import axios from "axios";
import config from "../../config.json";

// 5xx 상태에 대한 에러 핸들링
axios.interceptors.response.use(null, function(error) {
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expected) {
    // Log exception using somthing like sentry.io
    alert("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

const endPoint = config.apiUrl + "/todo";

export async function getTodos() {
  const response = await axios.get(endPoint);
  response.data.forEach(todo => (todo.due = new Date(todo.due)));
  return response;
}

export async function postTodo(todo) {
  return await axios.post(`${endPoint}`, todo);
}

export async function putTodo(todo) {
  console.log(todo);
  return await axios.put(`${endPoint}/${todo._id}`, todo);
}

export async function deleteTodo(id) {
  return await axios.delete(`${endPoint}/${id}`);
}
