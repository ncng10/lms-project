import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/admin-login"><button>Admin Login</button></Link>
        </div >
    )
}

export default LandingPage
