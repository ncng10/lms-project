import React, { useEffect, useState } from 'react'

function CourseListPage() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    async function getEnrolledCourses() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/enrolled-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

            const parseResCourse = await response.json();
            setEnrolledCourses(parseResCourse);
            console.log(parseResCourse);
        } catch (err) {
            console.log(err.message)
        }
    }

    async function getAvailableCourses() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/all-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

            const parseResCourse = await response.json();
            setAvailableCourses(parseResCourse);
            console.log(parseResCourse);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

    useEffect(() => {
        getAvailableCourses();
    }, [])

    return (
        <div className="courseListPage">
            <div className="currentlyEnrolled">
                <h3>Courses Currently Enroll In</h3>
                <ul>
                    {enrolledCourses.map((course) => (
                        <li>{course.course_name} {course.course_id}</li>
                    ))}
                </ul>
            </div>
            <div className="openEnrollmentClasses">
                <h3>Courses Available To Enroll In</h3>
                <ul>
                    {availableCourses.map((course) => (
                        <li>{course.course_name} {course.course_id}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CourseListPage