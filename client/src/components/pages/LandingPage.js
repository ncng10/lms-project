import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
import Login from '../Login'
function LandingPage(props) {
    return (
        <div className="landingPage">
            <Link to="/student-login"><button>Student Login</button></Link>
            <Link to="/admin-login"><button>Admin Login</button></Link>
        </div>
    )
}

export default LandingPage
