import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import './StudentDashboard.scss'
import StudentNavbar from './StudentNavbar';
import StudentTopBar from './StudentTopBar';
import StudentEnroll from './StudentEnroll';

function Dashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [courses, setCourses] = useState([]);
    const [navBarActive, setNavBarActive] = useState(true);

    async function getCourses() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/enrolled-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseResCourse = await response.json();
            setCourses(parseResCourse);
            console.log(parseResCourse);
        } catch (err) {
            console.log(err.message)
        }
    }

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setName(parseRes.user_name)
            setRole(parseRes.user_role);
        } catch (err) {
            console.log(err.message)
        }
    }
    function removeToken() {
        localStorage.removeItem('token')
    }

    useEffect(() => {
        getName()
    }, []);

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div className="dashboardBody">
            <div className="topMenu">
                {navBarActive ?
                    <div> <StudentNavbar /></div> : null}
                <center><div><StudentTopBar setAuth={setAuth} removeToken={removeToken} name={name} role={role} /></div></center>
            </div >
            <center>
                <div className="courseCardsContainer">
                    {courses.map((course) => (
                        <CourseCard course_id={course.course_id} courseName={course.course_name} />
                    ))}
                    <div style={{ fontSize: 15 }} className="courseCard"><h1><StudentEnroll /></h1></div>
                </div>
            </center>
        </div>
    )
}
export default Dashboard
