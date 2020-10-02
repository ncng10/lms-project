import React, { useEffect, useState } from 'react'

function AdminDashboard({ setAuth }) {
    const [name, setName] = useState("");
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setName(parseRes.user_name)
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
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Hello, {name}</h2>
            <button onClick={() => { setAuth(false); removeToken(); }}>Log Out</button>
        </div >
    )
}

export default AdminDashboard
