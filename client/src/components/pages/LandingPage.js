import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
import Login from '../Login'
function LandingPage(props) {
    return (
        <div className="landingPage">
            <Login setAuth={props.setAuth} />
        </div>
    )
}

export default LandingPage
