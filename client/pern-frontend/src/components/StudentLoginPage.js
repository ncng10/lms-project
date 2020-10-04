import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import "./LandingPage.scss"
import { CSSTransition } from 'react-transition-group'
function StudentLoginPage(props) {
    return (
        <div className="landingPage">
            <div className="body">
                <div className="authButtonsContainer" >
                    <img className="logo" src={require('../logo_2.png')} alt="" />
                    <center><h2> Authentication Portal</h2></center>
                    <button>Student Login</button>
                    <Link to="/student-registration"><button>Student Registration</button></Link>
                    <Link to="/admin-login"><button >Admin Login</button></Link>
                </div>
                <CSSTransition
                    in={StudentLoginPage}
                    appear={true}
                    timeout={600}
                    classNames="fade"><Login setAuth={props.setAuth} /></CSSTransition>
            </div>
        </div>
    )
}

export default StudentLoginPage
