import React from 'react'
import './StudentDashboard.scss'
import { Link } from 'react-router-dom'
import { BiDesktop, BiPencil, BiListUl, Bicog, BiCog } from "react-icons/bi";
function StudentNavbar() {
    return (
        <div className="studentNavBar">
            <img className="navLogo" src={require('./images/logo-smaller.png')} alt="" />
            <ul >
                <Link to="/dashboard">
                    <li >
                        <center><div><BiDesktop color="black" fontSize="40" /></div></center>
                        <a style={{ textDecoration: "none", color: 'black' }} >Dashboard</a>
                    </li>
                </Link>
                <Link to="/course-list">
                    <li>
                        <center><div><BiListUl color="black" fontSize="40" /></div></center>
                        <a style={{ textDecoration: "none", color: 'black' }}>
                            Course List
                            </a>
                    </li>
                </Link>
                <li>
                    <center><div><BiPencil fontSize="40" /></div></center>
                    <center>
                        <a style={{ textDecoration: "none", color: 'black' }} href="#">
                            Grades
                        </a>
                    </center>
                </li>
                <li>
                    <center><div><BiCog fontSize="40" /></div></center>
                    <center><a style={{ textDecoration: "none", color: 'black' }} href="#">Settings
                    </a></center>
                </li>
            </ul>
        </div>
    )
}

export default StudentNavbar
