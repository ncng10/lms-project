import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import './StudentDashboard.scss'
import StudentNavbar from './StudentNavbar';
import StudentTopBar from './StudentTopBar';

function Dashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [courses, setCourses] = useState([]);

    async function getCourses() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/courses",
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
    useEffect(() => {
        getCourses();
    }, []);


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
    }, [])
    return (
        <div className="dashboardBody">
            <div className="topMenu">
                <div> <StudentNavbar /></div>
                <center><div><StudentTopBar setAuth={setAuth} removeToken={removeToken} name={name} role={role} /></div></center>
                <center><div className="courseCardsContainer">
                    {courses.map((course) => (
                        <CourseCard courseName={course.course_name} />
                    ))}
                    <div style={{ fontSize: 75 }} className="courseCard"><h1>+</h1></div>
                </div></center>
                {/* <center><button onClick={() => { setAuth(false); removeToken(); }}>Log Out</button></center> */}
            </div ></div>
    )
}
export default Dashboard
