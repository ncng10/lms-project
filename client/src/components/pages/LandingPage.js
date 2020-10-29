import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
import StudentLoginPage from './StudentLoginPage'
function LandingPage(props) {
    return (
        <div className="landingPage">
            <Login setAuth={props.setAuth} />
        </div>
    )
}

export default LandingPage
