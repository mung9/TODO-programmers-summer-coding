import axios from "axios";

// 5xx 상태에 대한 에러 핸들링
axios.interceptors.response.use(null, function(error) {
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expected) {
    // Log exception using somthing like sentry.io
    alert("요청이 정상적으로 처리되지 않았습니다. 서버 문제일 수 있습니다.");
  }

  return Promise.reject(error);
});

const endPoint = "api/todo";

function resolveDateFormat(todo) {
  todo.due = todo.due ? new Date(todo.due) : null;
}

export async function getTodos() {
  const response = await axios.get(endPoint);
  response.data.forEach(todo => resolveDateFormat(todo));
  return response;
}

export async function postTodo(todo) {
  const response = await axios.post(`${endPoint}`, todo);
  resolveDateFormat(response.data);
  return response;
}

export async function putTodo(todo) {
  const response = await axios.put(`${endPoint}/${todo._id}`, todo);
  resolveDateFormat(response.data);
  return response;
}

export async function deleteTodo(id) {
  const response = await axios.delete(`${endPoint}/${id}`);
  resolveDateFormat(response.data);
  return response;
}
