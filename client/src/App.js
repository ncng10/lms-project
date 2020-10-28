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
import Dashboard from './components/student-dashboard'
import LandingPage from './components/pages/LandingPage';
import AdminDashboard from './components/AdminDashboard'
import CourseListPage from './components/pages/CourseListPage'
import AdminLoginPage from './components/pages/AdminLoginPage'
import StudentLoginPage from './components/pages/StudentLoginPage';
import StudentRegistrationPage from './components/pages/StudentRegistrationPage';
import StudentNavbar from './components/StudentNavbar';
import CourseHomePage from './components/pages/CourseHomePage';
import FilesPage from './components/pages/FilesPage';


function App() {

  //gets role of user logged in, does not allow student to log in as admin 
  const [adminRole, setAdminRole] = useState(false);
  async function getRole() {
    try {
      const response = await fetch("/student-dashboard/",
        {
          method: "GET",
          headers: { token: localStorage.token }
        });
      const parseRes = await response.json();
      parseRes.user_role === "Admin" ? setAdminRole(true) : setAdminRole(false);
      console.log(parseRes.user_role)
    } catch (err) {
      console.log(err.message)
    }
  }
  const setAdminAuth = (boolean) => {
    setAdminRole(boolean);
  };


  //react hook that sets the status of auth from jwt token jwt token as valid
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //function that is passed via props to login and registration pages
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //verifies jwt token and confirms authentication via is-verify route from nodejs
  async function isAuth() {
    try {
      const response = await fetch("/auth/is-verify",
        {
          method: "POST",
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
    isAuth();
  }, [])




  //css transition
  const [appearHome, setAppearHome] = useState(true);
  return (
    <Fragment>
      <Router>
        <Switch>

          <Route exact path="/course-list" component={CourseListPage} />

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
              classNames="fade"><AdminLoginPage {...props} setAuth={setAuth} setAdminAuth={setAdminAuth} /></CSSTransition>) : (
              <Redirect to="/admin-dashboard" />)} />

          {/* Renders student registration form, if authenticated, redirect to the student dashboard */}
          <Route exact path="/student-registration" render={props => !isAuthenticated ? (
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade"><StudentRegistrationPage {...props} setAuth={setAuth} /></CSSTransition>) : (
              <Redirect to="/student-dashboard" />)} />

          {/* Renders student login form, if authenticated, redirect to the student dashboard */}
          <Route exact path="/student-login" render={props => !isAuthenticated ? (
            <CSSTransition
              in={appearHome}
              appear={true}
              timeout={600}
              classNames="fade"><StudentLoginPage {...props} setAuth={setAuth} /></CSSTransition>) : (
              <Redirect to="/student-dashboard" />)} />

          {/* While in dashboard, if you are still authenticated, the dashboard stays rendered, if you are not authenticated, it will redirect to the landing page */}
          <Route exact path="/student-dashboard" render={props => isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/student-login" />)} />

          {/* While in admin dashboard, if you are still authenticated, the dashboard stays rendered, if you are not authenticated, it will redirect to the landing page */}
          <Route exact path="/admin-dashboard" render={props => isAuthenticated ? (
            <AdminDashboard {...props} setAuth={setAuth} />) : (
              <Redirect to="/admin-login" />)} />


          {/* loads page with course materials */}
          <Route exact path="/course/:courseID" component={CourseHomePage} />
          {/* loads page with user files */}
          <Route exact path="/files" component={FilesPage} />

        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
