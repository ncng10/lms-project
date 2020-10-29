import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AssignmentMenus from '../AssignmentMenus';
import StudentNavbar from '../StudentNavbar';
import './CourseHomePage.scss'
function CourseHomePage() {
    const { courseID } = useParams();

    //add a get request that gets course info from
    //local host/classinfo/userid/courseID or localhost/classinfo/courseID
    return (
        <div className="courseHomePage">
            <AssignmentMenus />
            <StudentNavbar />
        </div>
    )
}

export default CourseHomePage
