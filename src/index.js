import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'air-datepicker/air-datepicker.css';
import "ag-grid-community/styles/ag-grid.css"; 
import 'react-datepicker/dist/react-datepicker.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App/>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
