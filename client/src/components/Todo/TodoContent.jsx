import React from "react";
import Input from '../commons/Input';

const TodoEditForm = ({ todoBeingEdited, onTodoChange }) => {
  return (
    <>
      <div className="content-header">
        <Input
          name="title"
          value={todoBeingEdited.title}
          placeholder="새 TODO의 제목을 입력하세요."
          onChange={onTodoChange}
          maxLength={50}
          focus="true"
          label="제목"
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="content-body">
        <Input
          name="content"
          value={todoBeingEdited.content}
          placeholder="상세 내용을 입력하세요."
          onChange={onTodoChange}
          maxLength={500}
          type="textarea"
          label="내용"
          onClick={e => e.stopPropagation()}
        />
      </div>
    </>
  );
};

const TodoPlain = ({ todo }) => {
  return (
    <>
      <div className="content-header">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.due ? (
          <p
            className={`due ${
              isOverdue(todo.due) && !todo.done ? "overdue" : ""
            }`}
          >{`~${todo.due.getFullYear()}.${todo.due.getMonth() +
            1}.${todo.due.getDate()}`}</p>
        ) : (
          ""
        )}
      </div>
      <div className="content-body">
        <p className="todo-content">{todo.content}</p>
      </div>
    </>
  );
};

export default function TodoContent(props) {
  const { todoBeingEdited, todo, onTodoChange } = props;
  return (
    <div className="content">
      {todoBeingEdited ? (
        <TodoEditForm
          todoBeingEdited={todoBeingEdited}
          onTodoChange={onTodoChange}
        />
      ) : (
        <TodoPlain todo={todo} />
      )}
    </div>
  );
}
