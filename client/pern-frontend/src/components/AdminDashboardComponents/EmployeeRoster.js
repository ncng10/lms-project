import React, { useState, useEffect } from 'react'
import './EmployeeRoster.scss'

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
            <center>
                <h1> Class Roster</h1>
            </center>

            <table>
                <tbody >
                    <tr >
                        <th >Student Name</th>
                        <th>Student Email</th>
                    </tr>
                </tbody>
            </table>
            {
                employeeList.map((employee) => (
                    <EmployeeListFormat employeeName={employee.user_name} employeeEmail={employee.user_email} />
                ))
            }
        </div >
    )
}

const EmployeeListFormat = (props) => {
    return (
        <div className="employeeRow">
            <table>
                <tbody>
                    <tr>
                        <td className="info">{props.employeeName}</td>
                        <td className="info">{props.employeeEmail}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default EmployeeRoster
