import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/tooplate-style.css'
import './assets/css/style.css'
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "popper.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
