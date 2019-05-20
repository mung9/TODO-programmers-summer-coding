import React, { Component } from 'react'

export default function FixedDashboard({ todos, open, onToggleDashboard, onDeleteDone }) {
  const renderProp = function(name, label, value) {
    return (
      <p className={`prop ${name}`}>
        <span className="prop-name">{label}</span>
        <span className="prop-value">{value}</span>
      </p>
    );
  };

  let numOfOverdueTodos = 0;
  let numOfTodosDone = 0;
  todos.forEach(todo => {
    if (todo.done) {
      ++numOfTodosDone;
    } else if (todo.due && isOverdue(todo.due)) {
      ++numOfOverdueTodos;
    }
  });
  const numOfTodos = todos.length;

  return (
    <div
      className={`fixed-dashboard ${open ? "open" : "closed"}`}
      onClick={onToggleDashboard}
    >
      <button className="toggle-btn">{open ? ">>" : "<<"}</button>
      <div className="fixed-dashboard-content">
        <div className="props">
          {renderProp("total", "총 할 일", numOfTodos)}
          {renderProp("done", "완료 한 일", numOfTodosDone)}
          {renderProp("overdue", "기한 지난 일", numOfOverdueTodos)}
        </div>
        <button className="fixed-dashboard-content-btn" onClick={(e)=>{onDeleteDone(); e.stopPropagation()}}>
          완료된 작업 삭제
        </button>
      </div>
    </div>
  );
}
