import React, { useState } from 'react'
import './StudentDashboard.scss'
import { Link } from 'react-router-dom'
import { BiDesktop, BiPencil, BiListUl, Bicog, BiCog } from "react-icons/bi";
function StudentNavbar() {
    const [navBar, setNavBarActive] = useState(true);

    const navBarFunction = () => {
        if (!navBar) {
            setNavBarActive(true);
        } else {
            setNavBarActive(false);
        }
    }
    return (
        <React.Fragment>
            <div className={navBar ? "activeNav" : "studentNavBar"}>
                <ul >
                    <Link to="/dashboard">
                        <li className="dashboardIcon">
                            <a style={{ textDecoration: "none", color: 'white' }} >
                                Dashboard
                                </a>
                        </li>
                    </Link>
                    <Link to="/course-list">
                        <li className="coursesIcon">
                            <a style={{ textDecoration: "none", color: 'white' }}>
                                Courses
                            </a>
                        </li>
                    </Link>
                    <Link>
                        <li className="gradesIcon">
                            <a style={{ textDecoration: "none", color: 'white' }} >
                                Grades
                        </a>
                        </li>
                    </Link>

                </ul>
            </div>
            <div className="hamburger" onClick={navBarFunction}>
                <div className="burger"></div>
                <div className="burger"></div>
                <div className="burger"></div>
            </div>
        </React.Fragment>
    )
}

export default StudentNavbar
