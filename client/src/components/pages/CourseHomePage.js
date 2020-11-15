import React from 'react'
import AssignmentMenus from '../AssignmentMenus';
import StudentNavbar from '../StudentNavbar';
import './CourseHomePage.scss'
function CourseHomePage() {
    return (
        <div className="courseHomePage">
            <AssignmentMenus />
            <StudentNavbar />
        </div>
    )
}

export default CourseHomePage
