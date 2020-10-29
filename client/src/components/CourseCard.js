import React from 'react'
import './StudentDashboard.scss'
function CourseCard(props) {

    const colorPallete = [
        '#FF9035', 'rgb(251,211,150)',
        '#5F8CFF', 'rgb(240,167,167)',
    ]
    let randomColor = colorPallete[Math.floor(Math.random() * colorPallete.length)]

    return (
        <div style={{ backgroundColor: randomColor }} className="courseCard">
            <div className="courseInfoSection">
                <h2>{props.courseName}</h2>
                <center><h3>Instructor: {props.courseInstructor}</h3></center>
            </div>
        </div>
    )
}

export default CourseCard
