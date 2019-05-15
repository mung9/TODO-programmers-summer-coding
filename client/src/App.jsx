import React, { Component } from "react";
import Header from "./components/commons/Header";
import Todo from "./components/Todo/index";
import Footer from "./components/commons/Footer";

import './main.css';
import './components/commons/common.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes, faCircle, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

console.log(faExclamationTriangle);
library.add([faTimes, faPen, faCircle,faExclamationTriangle]);

export default class App extends Component {
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
