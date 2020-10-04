import React, { useEffect, useState } from 'react'
import AdminNavBar from './AdminDashboardComponents/AdminNavBar'
import './AdminDashboard.scss'
function AdminDashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
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
    }
    useEffect(() => {
        getName()
    })
    return (
        <div className="adminDashboard">
            <AdminNavBar logOut={() => { setAuth(false); removeToken(); }} />
            <h4>Hello, {name} ({role})</h4>
            <div className="categoryCards">
                <div className="menuCard"></div>
                <div className="menuCard"></div>
                <div className="menuCard"></div>
                <div className="menuCard"></div>
                <div className="menuCard"></div>
            </div>
        </div >
    )
}

export default AdminDashboard
