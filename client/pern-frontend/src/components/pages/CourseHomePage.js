import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StudentNavbar from '../StudentNavbar';
function CourseHomePage() {
    const { classID } = useParams();
    return (
        <div>
            <StudentNavbar />

        </div>
    )
}

export default CourseHomePage
