import React, { Component } from "react";
import Header from "./components/commons/Header";
import Todo from "./components/Todo/index";
import Footer from "./components/commons/Footer";

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
