import React from 'react'
import { CourseCardContainer } from '../styled-components/DashboardStyles'
function CourseCard(props) {
    return (
        <CourseCardContainer>
            <center><h2>{props.courseName}</h2></center>
            <center><h3>Instructor: {props.courseInstructor}</h3></center>
        </CourseCardContainer>
    )
}

export default CourseCard
