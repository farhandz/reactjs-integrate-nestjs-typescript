import React from 'react'
import Input from './components/Input';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GetData from './components/GetData';
import EditData from './components/EditData';
import Login from './components/Login'
const token = localStorage.getItem("token")
function App() {
  return (
    <div>
      <div className="container main-content">
        {!token ? (
          <Router>
            <Redirect to={{ pathname: "/login" }} />
            <Route path="/login" exact={true} component={Login} />
          </Router>
        ) : (
          <Router>
            <Route path="/" exact={true} component={Input} />
            <Route path="/data" exact={true} component={GetData} />
            <Route path="/data/:id" exact={true} component={EditData} />
          </Router>
        )}
      </div>
    </div>
  );
}

export default App
