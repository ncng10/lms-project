import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hamburger } from '../styled-components/DashboardStyles';
function StudentNavbar() {
    const [navBar, setNavBarActive] = useState(false);
    return (
        <React.Fragment>
            {navBar ?
                <div >
                    <div onClick={() => setNavBarActive(false)}>X</div>
                    <ul style={{ textDecoration: 'none' }}>
                        <Link to="/student-dashboard">
                            <li className="dashboardIcon">
                                <span style={{ textDecoration: "none", color: '#121212' }} >
                                    Dashboard
                                </span>
                            </li>
                        </Link>
                        <Link to="/course-list">
                            <li className="coursesIcon">
                                <span style={{ textDecoration: "none", color: '#121212' }}>
                                    Courses
                            </span>
                            </li>
                        </Link>
                        <Link>
                            <li className="gradesIcon">
                                <span style={{ textDecoration: "none", color: '#121212' }} >
                                    Grades
                        </span>
                            </li>
                        </Link>

                    </ul>
                </div> :
                <Hamburger className="hamburger" onClick={() => setNavBarActive(true)}>
                    <div className="burger"></div>
                    <div className="burger"></div>
                    <div className="burger"></div>
                </Hamburger>
            }
        </React.Fragment >
    )
}

export default StudentNavbar
