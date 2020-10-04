import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import './App.css';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard'
import EmployeeRoster from './components/AdminDashboardComponents/EmployeeRoster'
import AdminLoginPage from './components/AdminLoginPage';
import StudentLoginPage from './components/StudentLoginPage';
import StudentRegistrationPage from './components/StudentRegistrationPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //function that is passed via props to login and registration pages
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //verifies jwt token and confirms authentication via is-verify route from nodejs
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

  //checks authentication every page load so you stay logged in on page refresh
  useEffect(() => {
    isAuth()
  }, [])

  //css transition
  const [appearHome, setAppearHome] = useState(true);
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/student-roster" component={EmployeeRoster} />

          {/* Renders landing page */}
          <Route exact path="/" > <CSSTransition
            in={appearHome}
            appear={true}
            timeout={600}
            classNames="fade"><LandingPage /></CSSTransition></Route>

          {/* Renders admin login, if authenticated via login form, redirect to the admin dashboard */}
          <Route exact path="/admin-login" render={props => !isAuthenticated ? (
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade"><AdminLoginPage {...props} setAuth={setAuth} /></CSSTransition>) : (
              <Redirect to="/admin-dashboard" />)} />

          {/* Renders student registration form, if authenticated, redirect to the student dashboard */}
          <Route exact path="/student-registration" render={props => !isAuthenticated ? (
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade"><StudentRegistrationPage {...props} setAuth={setAuth} /></CSSTransition>) : (
              <Redirect to="/dashboard" />)} />

          {/* Renders student login form, if authenticated, redirect to the student dashboard */}
          <Route exact path="/student-login" render={props => !isAuthenticated ? (
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade"><StudentLoginPage {...props} setAuth={setAuth} /></CSSTransition>) : (
              <Redirect to="/dashboard" />)} />

          {/* While in dashboard, if you are still authenticated, the dashboard stays rendered, if you are not authenticated, it will redirect to the landing page */}
          <Route exact path="/dashboard" render={props => isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/" />)} />

          {/* While in admin dashboard, if you are still authenticated, the dashboard stays rendered, if you are not authenticated, it will redirect to the landing page */}
          <Route exact path="/admin-dashboard" render={props => isAuthenticated ? (
            <AdminDashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/" />)} />

        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
