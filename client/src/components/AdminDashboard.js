import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminDashboardComponents/AdminNavBar'
import './AdminDashboard.scss'
function AdminDashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [coursesTaughtList, setCoursesTaughtList] = useState("");

    async function getCoursesTaughtList() {
        try {
            const response = await fetch("/dashboard/taught-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setCoursesTaughtList(parseRes)
            console.log(parseRes)
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getName() {
        try {
            const response = await fetch("/dashboard/admin-verif",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setName(parseRes.user_name)
            setRole(parseRes.user_role)
        } catch (err) {
            console.log(err.message)
        }
    }
    function removeToken() {
        localStorage.removeItem('token')
    };

    useEffect(() => {
        getCoursesTaughtList();
    }, []);

    useEffect(() => {
        getName();
    });

    if (name === "") {
        return (
            <h1>Not authorized. Please return to the login screen.</h1>
        )
    } else {
        return (
            <div className="adminDashboard">
                <AdminNavBar logOut={() => { setAuth(false); removeToken(); }} />
                <h4>Hello, {name} ({role})</h4>

                <div className="categoryCardsContainer">
                    <div className="coursesTaught">
                        <h2>Your Courses</h2>
                        {coursesTaughtList.map((course) => (
                            <div className="courses">
                                {`Course Name: ${course.course_name}`}
                            </div>
                        ))}
                    </div>
                    <div className="assignmentsTBGraded">
                        <div>Hi</div>
                    </div>
                    <div className="menuCard"></div>
                    <div className="menuCard"></div>
                    <div className="menuCard"></div>
                </div>
            </div >
        )
    }
}

export default AdminDashboard
