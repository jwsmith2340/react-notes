import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
//^^Your sass styling
import { BrowserRouter } from 'react-router-dom'
/* 2) We import BrowserRouter from react-router-dom. This is what allows us 
to use routers in our code. It wraps the React.StrictMode in the ReactDOM.render
below. Now that that's done, back to App.js<< */
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
