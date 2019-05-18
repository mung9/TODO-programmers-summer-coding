import React, { Component } from "react";
import PropTypes from "prop-types";

export default class InputGroup extends Component {
  renderLabelOrNot = () => {
    const {inputId, label} = this.props;
    return label ? <label className='input-label' htmlFor={inputId}>{label}</label> : null;
  };

  render() {
    return (
      <div className="input-group">
        {this.renderLabelOrNot()}
        {this.props.children}
      </div>
    );
  }
}

InputGroup.propTypes = {
  label: PropTypes.string,
  inputId: PropTypes.string
};
