import React from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.scss"
function LandingPage() {
    return (
        <div className="landingPage">
            <div className="body">
                <div className="authButtonsContainer">
                    <center><h2> Employee Portal</h2></center>
                    <Link to="/login"><button>Employee Login</button></Link>
                    <Link to="/register"><button>Employee Registration</button></Link>
                    <Link to="/admin-login"><button>Admin Login</button></Link>
                </div>
            </div>

        </div>



    )
}

export default LandingPage
