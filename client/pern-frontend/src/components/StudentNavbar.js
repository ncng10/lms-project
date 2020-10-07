import React from 'react'
import './StudentDashboard.scss'
function StudentNavbar() {
    return (
        <div className="studentNavBar">
            <img className="navLogo" src={require('./images/logo-smaller.png')} alt="" />
            <ul >
                <li ><a style={{ textDecoration: "none", color: 'black' }} href="/dashboard">Dashboard</a></li>
                <li><a style={{ textDecoration: "none", color: 'black' }} href="#">Course List</a></li>
                <li><a style={{ textDecoration: "none", color: 'black' }} href="#">Grades</a></li>
                <li><a style={{ textDecoration: "none", color: 'black' }} href="#">Settings</a></li>
            </ul>
        </div>
    )
}

export default StudentNavbar
