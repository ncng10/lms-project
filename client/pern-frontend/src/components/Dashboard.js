import React, { useEffect, useState } from 'react'


function Dashboard({ setAuth }) {
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
    })
    return (
        <div>
            <h1>Student Dashboard</h1>
            <h2>Hello, {name} ({role})</h2>
            <button onClick={() => { setAuth(false); removeToken(); }}>Log Out</button>
        </div >
    )
}

export default Dashboard
