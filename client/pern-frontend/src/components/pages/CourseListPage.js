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
            const response = await fetch("http://localhost:5000/dashboard/available-courses",
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
                "http://localhost:5000/dashboard/enroll",
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
            console.error('You are already enrolled in this class.');
        }
    };

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
                <form onSubmit={e => handleEnrollment(e)}>
                    <select name="course_id" value={course_id} onChange={e => { onChange(e); }}>
                        <option selected disabled value=''></option>
                        {availableCourses.map((course) => (
                            <option name={course_id} value={course.course_id}>{course.course_name} {course.course_id}</option>
                        ))}
                    </select>
                    <button type="submit">Enroll In This Class</button>
                </form>
            </div>
        </div>
    )
}

export default CourseListPage