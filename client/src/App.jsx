import React, { Component } from "react";
import Header from "./components/commons/Header";
import Todo from "./components/Todo/index";
import Footer from "./components/commons/Footer";

import "babel-polyfill";

import "./main.css";
import "./components/commons/common.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTimes,
  faCircle,
  faExclamationTriangle,
  faCheck,
  faTrash,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

library.add([
  faTimes,
  faPen,
  faCircle,
  faExclamationTriangle,
  faCheck,
  faTrash,
  faArrowCircleRight
]);

class App extends Component {
  componentDidUpdate(){
    this.props.error && alert(this.props.error);
  }

  render() {
    return (
      <>
        <Header />
        <Todo />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps)(App);
// export default connect()(App);
