import React from 'react'
import './StudentDashboard.scss'
import { Link } from 'react-router-dom'
function StudentNavbar() {
    return (
        <div className="studentNavBar">
            <img className="navLogo" src={require('./images/logo-smaller.png')} alt="" />
            <ul >
                <Link to="/dashboard"><li ><a style={{ textDecoration: "none", color: 'black' }} >Dashboard</a></li></Link>
                <Link to="/course-list"><li><a style={{ textDecoration: "none", color: 'black' }}>Course List</a></li></Link>
                <li><a style={{ textDecoration: "none", color: 'black' }} href="#">Grades</a></li>
                <li><a style={{ textDecoration: "none", color: 'black' }} href="#">Settings</a></li>
            </ul>
        </div>
    )
}

export default StudentNavbar
