import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ownerReducer from './reducers/ownerReducer'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'material-symbols';
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"

const store = createStore(ownerReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

