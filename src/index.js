import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
  items:[], 
  bonuses:[
    "Грузоподъемность",
	  "Добыча Золота",
    "Добыча реcурсов"
  ]
}
const store = createStore(reducer,initialState,applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

, document.getElementById('root'));

