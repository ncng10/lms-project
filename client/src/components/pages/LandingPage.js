import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
import Login from '../Login'
function LandingPage(props) {
    return (
        <div className="landingPage">
            <div className="buttons">
                <div className="buttonContainer">
                    <Link to="/student-login"><button>Student Login</button></Link>
                </div>
                <div className="buttonContainer">
                    <Link to="/admin-login"><button>Admin Login</button></Link>
                </div>
                <div className="buttonContainer">
                    <Link to="/student-registration"><button>Student Registration</button></Link>
                </div>

            </div>



        </div>
    )
}

export default LandingPage
