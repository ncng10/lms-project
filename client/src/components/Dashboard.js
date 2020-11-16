import React, { useEffect, useState } from 'react'
import CourseCardContainer from './CourseCard';
import StudentNavbar from './StudentNavbar';
import StudentTopBar from './StudentTopBar';
import { Link } from 'react-router-dom'
import { DashboardContainer, CardsContainer } from '../styled-components/DashboardStyles';

function Dashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [courses, setCourses] = useState([]);
    const [navBarActive,] = useState(true);

    async function getCourses() {
        try {
            const response = await fetch("/dashboard/enrolled-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseResCourse = await response.json();
            setCourses(parseResCourse);
        } catch {

        }
    }

    async function getName() {
        try {
            const response = await fetch("/dashboard",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setName(parseRes.user_name)
            setRole(parseRes.user_role);
        } catch {
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
    const [menuActive, setMenuActive] = useState(false);
    function menuFunctionality() {
        if (!menuActive) {
            setMenuActive(true)
        } else {
            setMenuActive(false)
        }
    }
    function menuFunctionalityBody() {
        if (menuActive) {
            setMenuActive(false)
        }
    }
    return (
        <React.Fragment>
            <DashboardContainer>
                <div className="topMenu">
                    <center><div>
                        <StudentTopBar menuActive={menuActive} menuFunctionality={menuFunctionality} setAuth={setAuth} removeToken={removeToken} name={name} role={role} /></div></center>
                </div >
                <div className="dashboardBody" onClick={menuFunctionalityBody}>
                    <div> <StudentNavbar /></div>
                    <CardsContainer>
                        {courses.map((course) => (
                            <Link style={{ textDecoration: 'none', color: "black" }} to={`/course/${course.course_id}`}>
                                <CourseCardContainer course_id={course.course_id} courseName={course.course_name} courseInstructor={course.course_instructor} /></Link>
                        ))}
                    </CardsContainer>
                </div>
            </DashboardContainer>
        </React.Fragment>
    )
}
export default Dashboard
