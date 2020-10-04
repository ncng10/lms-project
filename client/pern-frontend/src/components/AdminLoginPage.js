import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import "./LandingPage.scss"
import { CSSTransition } from 'react-transition-group'
function AdminLoginPage(props) {
    return (
        <div className="landingPage">
            <div className="body">

                <div className="authButtonsContainer">
                    <img className="logo" src={require('../logo_2.png')} alt="" />
                    <center><h2> Authentication Portal</h2></center>
                    <Link to="/student-login"><button>Student Login</button></Link>
                    <Link to="/student-registration"><button>Student Registration</button></Link>
                    <button >Admin Login</button>
                </div>
                <CSSTransition
                    in={AdminLoginPage}
                    appear={true}
                    timeout={600}
                    classNames="fade"><AdminLogin setAuth={props.setAuth} /></CSSTransition>
            </div>

        </div>



    )
}

export default AdminLoginPage
