import React, { useState, useEffect } from 'react'

function EmployeeRoster() {
    const [employeeList, setEmployeeList] = useState([]);

    async function getEmployeeList() {
        try {
            const response = await fetch("http://localhost:5000/admin-dashboard/",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setEmployeeList(parseRes)
            console.log(parseRes)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getEmployeeList()
    }, [])
    return (
        <div className="employeeList">
            <h1> Employee Roster</h1>
            {employeeList.map((employee) => (
                <h1>{employee.user_name}</h1>
            ))}
        </div>
    )
}

export default EmployeeRoster
