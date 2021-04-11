import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Manifactor from "./components/manifiactor.component";
import pharmacy from "./components/pharmacy.component";
import admin from "./components/admin.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Shared_Vars from "./components/Helper/shared";
import getWeb3 from "./getWeb3";

function App() {
  getWeb3();
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Fakes</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/manifactor" component={Manifactor} />
            <Route path="/pharmacy" component={pharmacy} />
            <Route path="/admin" component={admin} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;
