import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';
import App from './App';
import Reducers from './reducers'
import reportWebVitals from './reportWebVitals';

const store= createStore(Reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode >
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
