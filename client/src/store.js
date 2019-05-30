import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  applyMiddleware(thunk, logger, sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;
