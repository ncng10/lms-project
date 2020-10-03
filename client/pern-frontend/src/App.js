import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin';
import EmployeeRoster from './components/AdminDashboardComponents/EmployeeRoster'
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)


  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",
        {
          method: "GET",
          headers: { token: localStorage.token }
        });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    isAuth()
  }, [])


  return (
    <Fragment>
      <Router>
        <Switch>

          <Route exact path="/employee-roster" component={EmployeeRoster} />

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin-login" render={props => !isAuthenticated ? (
            <AdminLogin {...props} setAuth={setAuth} />) : (
              <Redirect to="/admin-dashboard" />)} />

          <Route exact path="/login" render={props => !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} />) : (
              <Redirect to="/dashboard" />)} />

          <Route exact path="/register" render={props => !isAuthenticated ? (
            <Register {...props} setAuth={setAuth} />) : (
              <Redirect to='/login' />)} />

          <Route exact path="/dashboard" render={props => isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/login" />)} />

          <Route exact path="/admin-dashboard" render={props => isAuthenticated ? (
            <AdminDashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/admin-login" />)} />

        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
