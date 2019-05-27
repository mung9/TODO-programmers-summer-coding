import React, { Component } from "react";
import { isOverdue } from "../../util/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import { deleteDone } from "../../actions/todoActions";

const PropRow = ({ name, label, value }) => {
  return (
    <p className={`prop ${name}`}>
      <span className="prop-name">{label}</span>
      <span className="prop-value">{value}</span>
    </p>
  );
};

class FixedDashboard extends Component {
  state = {
    open: false
  };

  handleToggleShow = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const todos = this.props.todos;

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
        onClick={this.handleToggleShow}
      >
        <FontAwesomeIcon
          className="toggle-btn clickable"
          icon="arrow-circle-right"
        />
        <div className="fixed-dashboard-content">
          <div className="props">
            <PropRow name="total" label="총 할 일" value={numOfTodos} />
            <PropRow name="done" label="완료 한 일" value={numOfTodosDone} />
            <PropRow
              name="overdue"
              label="기한 지난 일"
              value={numOfOverdueTodos}
            />
          </div>
          <button
            className="fixed-dashboard-content-btn"
            onClick={e => {
              this.props.onDeleteDone(todos);
              e.stopPropagation();
            }}
          >
            완료된 작업 삭제
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteDone: originalTodos => dispatch(deleteDone(originalTodos))
  };
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(FixedDashboard);
