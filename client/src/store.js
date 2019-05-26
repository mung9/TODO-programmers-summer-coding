import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers/todoReducer';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  todos: todoReducer
});

const initialState={};

const enhancers = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...enhancers));

export default store;