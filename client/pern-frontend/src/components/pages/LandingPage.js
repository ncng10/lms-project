import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
function LandingPage() {
    return (
        <div className="landingPage">
            <div className="body">

                <div className="authButtonsContainer">
                    <img className="logo" src={require('../images/logo_2.png')} alt="" />
                    <center><h2> Authentication Portal</h2></center>
                    <Link to="/student-login"><button>Student Login</button></Link>
                    <Link to="/student-registration"><button>Student Registration</button></Link>
                    <Link to="admin-login"><button >Admin Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
