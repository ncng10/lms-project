import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Register from './Register'
import "./LandingPage.scss"
import { CSSTransition } from 'react-transition-group'

function StudentRegistrationPage(props) {
    return (
        <div className="landingPage">
            <div className="body">
                <div className="authButtonsContainer" >
                    <img className="logo" src={require('../logo_2.png')} alt="" />
                    <center><h2> Authentication Portal</h2></center>
                    <Link to="/student-login"><button>Student Login</button></Link>
                    <button>Student Registration</button>
                    <Link to="/admin-login"><button >Admin Login</button></Link>
                </div>
                <CSSTransition
                    in={StudentRegistrationPage}
                    appear={true}
                    timeout={600}
                    classNames="fade"><Register setAuth={props.setAuth} /></CSSTransition>
            </div>
        </div>
    )
}

export default StudentRegistrationPage
