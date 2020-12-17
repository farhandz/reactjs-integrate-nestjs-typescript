import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

axios.interceptors.response.use(
  function (response) {
    console.log(response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with respon se data
    return response;
  },
  function (error) {
     const status = error.response.status;
     if (status === 401) {
       axios
         .post("http://localhost:3333/employee/refresh", {
           refresh: localStorage.getItem("refreshToken"),
         })
         .then((dt) => {
           console.log(dt)
           window.location.href = "/";
           localStorage.setItem("token", dt.data.token);
         });
     } else {
       localStorage.removeItem("token");
       window.location.href = "/login";
     }
     console.log(status)
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
