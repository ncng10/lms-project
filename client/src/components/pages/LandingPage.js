import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
import StudentLoginPage from './StudentLoginPage'
function LandingPage() {
    return (
        <div className="landingPage">
            <StudentLoginPage />
        </div>
    )
}

export default LandingPage
