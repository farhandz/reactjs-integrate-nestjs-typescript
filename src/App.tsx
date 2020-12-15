import React from 'react'
import Input from './components/Input';
import { BrowserRouter as Router, Route } from "react-router-dom";
import GetData from './components/GetData';
import EditData from './components/EditData';


function App() {
  return (
    <div>
      <div className="container main-content">
        <Router>
          <Route path="/" exact={true} component={Input} />
          <Route path="/data" exact={true} component={GetData} />
          <Route path="/data/:id" exact={true} component={EditData} />
        </Router>
      </div>
    </div>
  );
}

export default App
