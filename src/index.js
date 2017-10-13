import React from 'react';
import thunkMiddleware from 'redux-thunk';
//import { createLogger } from 'redux-logger';
import { Route, withRouter, Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { history } from './helpers1/history1';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
console.log("this is history" + JSON.stringify(history));

export const store = createStore(
    reducer,
    applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    ,
    document.getElementById('root')
);

