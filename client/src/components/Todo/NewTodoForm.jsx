import React, { Component } from "react";
import _ from "lodash";
import Input from "../commons/Input";
import DateSelector from "../commons/DateSelector";
import PropTypes from "prop-types";
import PriorityCircle from "../commons/PriorityCircle";
import { nextPriorityOf } from "../commons/priority";
import InputGroup from "../commons/InputGroup";

import { connect } from "react-redux";
import { requestPostTodo } from "../../actions/ajaxActions";

const emptyTodo = {
  title: "",
  content: "",
  due: null,
  done: false,
  priority: 1
};

class NewTodoForm extends Component {
  state = {
    newTodo: emptyTodo,
    formOpened: false
  };

  handleDueToggle = () => {
    const newTodo = { ...this.state.newTodo };
    newTodo.due = newTodo.due ? null : new Date();
    this.setState({ newTodo });
  };

  handleFormOpenedToggle = () => {
    const formOpened = !this.state.formOpened;
    this.setState({ formOpened, newTodo: emptyTodo });
  };

  handlePriorityChange = () => {
    const newTodo = { ...this.state.newTodo };
    newTodo.priority = nextPriorityOf(newTodo.priority);
    this.setState({ newTodo });
  };

  handleChange = ({ currentTarget }) => {
    const newTodo = { ...this.state.newTodo };
    newTodo[currentTarget.name] = currentTarget.value;
    this.setState({ newTodo });
  };

  handleSelectDate = ({ currentTarget }) => {
    if (!this.state.newTodo.due) return;

    const { name, value } = currentTarget;
    const newTodo = { ...this.state.newTodo };
    const due = new Date(newTodo.due);
    switch (name) {
      case "year":
        due.setFullYear(value);
        break;
      case "month":
        due.setMonth(value - 1);
        break;
      case "date":
        due.setDate(value);
        break;
      default:
        console.error("due date를 설정하는 도중에 문제가 발생했습니다.");
        return;
    }

    newTodo.due = due;
    this.setState({ newTodo });
  };

  renderPriorityInput = () => {
    const { newTodo } = this.state;
    return (
      <InputGroup label="중요도">
        <PriorityCircle
          item={newTodo}
          className="priority-input-circle"
          onPriorityChange={this.handlePriorityChange}
          showLabel={true}
        />
      </InputGroup>
    );
  };

  renderControllButton = () => {
    const { newTodo } = this.state;
    const { onAddTodo } = this.props;
    return this.state.formOpened ? (
      <>
        <input
          className={`new-todo-control-btn ${!newTodo.title ? "disabled" : ""}`}
          type="submit"
          form="new-todo-form"
          onClick={e => {
            e.preventDefault();
            if (!newTodo.title) return;
            onAddTodo(newTodo);
            this.handleFormOpenedToggle();
          }}
          value="확인"
        />
        <button
          onClick={this.handleFormOpenedToggle}
          className="new-todo-control-btn"
        >
          취소
        </button>
      </>
    ) : (
      <button
        className="new-todo-control-btn"
        onClick={this.handleFormOpenedToggle}
      >
        추가
      </button>
    );
  };

  renderHeader = () => {
    return (
      <div className="new-todo-header">
        <h1 className="new-todo-label">새로운 할 일</h1>
        {this.renderControllButton()}
      </div>
    );
  };

  renderForm = () => {
    const { newTodo } = this.state;
    return (
      <form onSubmit={() => onAdd(newTodo)} id="new-todo-form">
        <Input
          name="title"
          value={newTodo.title}
          placeholder="새 TODO의 제목을 입력하세요."
          onChange={this.handleChange}
          maxLength={50}
          label="제목"
          focus="true"
        />
        <Input
          name="content"
          value={newTodo.content}
          placeholder="상세 내용을 입력하세요."
          onChange={this.handleChange}
          maxLength={500}
          label="내용"
          type="textarea"
        />
        {this.renderPriorityInput()}
        <button
          className="new-todo-control-btn toggle-due-btn"
          onClick={e => {
            e.preventDefault();
            this.handleDueToggle();
          }}
        >
          {newTodo.due ? "기한 필요 없어요" : "기한을 둘 거에요 ⏰"}
        </button>
        {newTodo.due ? (
          <DateSelector
            date={newTodo.due}
            onChange={this.handleSelectDate}
            label="기한"
          />
        ) : (
          ""
        )}
      </form>
    );
  };

  render() {
    const { formOpened } = this.state;
    return (
      <div className="new-todo">
        {this.renderHeader()}
        {formOpened ? this.renderForm() : ""}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: todo => dispatch(requestPostTodo(todo))
  };
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(NewTodoForm);
