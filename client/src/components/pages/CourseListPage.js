import React, { useEffect, useState } from 'react'
import StudentNavbar from '../StudentNavbar';
import './CourseListPage.scss'
function CourseListPage() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    async function getEnrolledCourses() {
        try {
            const response = await /dashboard/enrolled - courses",
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
            const response = await /dashboard/available - courses",
            {
                method: "GET",
                    headers: { token: localStorage.token }
            })


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
    }, []);


    const [inputs, setInputs] = useState({
        course_id: ""
    })
    const { course_id } = inputs;
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value });
        console.log(course_id)
    }

    const handleEnrollment = async (e) => {
        e.preventDefault();
        try {
            const body = { course_id };
            const response = await fetch(
                "/dashboard/enroll",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            console.log(parseRes)
        } catch (err) {
            alert('Choose a valid course or one you are not enrolled in.');
        }
    };

    return (
        <div className="courseListPage">
            <StudentNavbar />
            <div className="courseListContainer">
                <div className="currentlyEnrolled">
                    <h3>Courses Currently Enrolled In</h3>
                    <ul>
                        {enrolledCourses.map((course) => (
                            <li>{course.course_name} / Course #: {course.course_id}</li>
                        ))}
                    </ul>
                </div>
                <div className="openEnrollmentClasses">
                    <h3>Courses Available To Enroll In</h3>
                    <ul>
                        {availableCourses.map((course) => (
                            <li>{course.course_name} / Course #: {course.course_id}</li>
                        ))}
                    </ul>
                    <br />
                    <div className="selectContainer">
                        <h4>Enroll in a Course:</h4>
                        <form onSubmit={e => handleEnrollment(e)}>
                            <select name="course_id" value={course_id} onChange={e => { onChange(e); }}>
                                <option defaultValue disabled value=''></option>
                                {availableCourses.map((course) => (
                                    <option name={course_id} value={course.course_id}>{course.course_name} / Course #: {course.course_id}</option>
                                ))}
                            </select>
                            <button type="submit">Enroll In This Class</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseListPage