// import dotenv from 'dotenv/config';
// const path = `../.env.${process.env.NODE_ENV}`;
// console.log(path);
// const a = dotenv.config({path: `../.env.${process.env.NODE_ENV}`});

// console.log(a);

import React from "react";
import { render } from "react-dom";
import App from "./App.jsx";

const root = document.getElementById("root");
render(<App />, root);
