import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducer from '../src/sphinx/reducers/index'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store

if (process.env.NODE_ENV === 'development') {
  store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  ))
} else {
  store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
  ))
}

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('sphinx_root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
