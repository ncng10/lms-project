import React, { useState } from 'react'
import './StudentDashboard.scss'
import { Link } from 'react-router-dom'
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
                    <Link to="/student-dashboard">
                        <li className="dashboardIcon">
                            <span style={{ textDecoration: "none", color: 'white' }} >
                                Dashboard
                                </span>
                        </li>
                    </Link>
                    <Link to="/course-list">
                        <li className="coursesIcon">
                            <span style={{ textDecoration: "none", color: 'white' }}>
                                Courses
                            </span>
                        </li>
                    </Link>
                    <Link>
                        <li className="gradesIcon">
                            <span style={{ textDecoration: "none", color: 'white' }} >
                                Grades
                        </span>
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
