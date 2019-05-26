import React from "react";
import { render } from "react-dom";
import App from "./App.jsx";

import {Provider} from 'react-redux';
import store from './store';

const root = document.getElementById("root");
// render(<Provide store={store}><App /></Provide>, root);

render(<Provider store={store}><App /></Provider>, root);