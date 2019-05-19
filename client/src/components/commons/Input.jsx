import React, { Component } from "react";
import PropTypes from "prop-types";
import InputGroup from "./InputGroup";

export default class Input extends Component {
  componentDidUpdate() {
    this.adjustTextareaHeight(this.component);
  }

  componentDidMount() {
    this.adjustTextareaHeight(this.component);

    if (this.props.focus) {
      this.component && this.component.focus();
    }
  }

  adjustTextareaHeight(textarea) {
    if (textarea && textarea.tagName === "TEXTAREA") {
      textarea.style.height = 0;
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  getId = () => {
    return `input-${this.props.name}`;
  };

  renderInputField = () => {
    const { type } = this.props;
    const id = this.getId();
    return type === "textarea" ? (
      <textarea
        id={id}
        {...this.props}
        ref={component => {
          this.component = component;
        }}
      />
    ) : (
      <input
        id={id}
        {...this.props}
        ref={component => {
          this.component = component;
        }}
      />
    );
  };

  render() {
    return (
      <InputGroup label={this.props.label} inputId={this.getId()}>
        {this.renderInputField()}
      </InputGroup>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

Input.defaultProp = {
  type: "text"
};
