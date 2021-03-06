import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop'
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <ScrollToTop >
        <Route path="/" component={App}/>
      </ScrollToTop >
    </Router>
  </Provider>,
  document.getElementById('root')

);

export default store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
