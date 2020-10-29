import React, { useState } from 'react'
import './pages/LandingPage.scss'
function Register({ setAuth, setUserRole }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
        userRole: "Student"
    })
    const { email, password, name, userRole } = inputs;
    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { email, password, name, userRole }
            const response = await fetch("http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            console.log(parseRes);
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="registrationContainer">
            <img className="logo" src={require('./images/logo_2.png')} alt="" />
            <h2>Student Registration</h2>
            <form onSubmit={onSubmitForm}>
                <div className="input">
                    <label>Email:
                    <br />
                        <input name="email"
                            value={email}
                            type="text"
                            onChange={e => onChange(e)} />
                    </label>
                </div>
                <div className="input">
                    <label>Password:
                    <br />
                        <input name="password"
                            value={password}
                            type="password"
                            onChange={e => { onChange(e); console.log(userRole) }} />
                    </label>
                </div>
                <div className="input">
                    <label>Name/Username:
           <input
                            required={true}
                            type="text" name="name"
                            value={name}
                            onChange={(event) => onChange(event)} />
                    </label>
                </div>
                <div label="inputSelect">
                    <center><label>
                        Account Type:
                        <br />
                        <select>
                            <option value={userRole} defaultValue="Student" >Student</option>
                        </select>
                    </label></center>
                </div>
                <center><button type="submit">Register</button></center>
            </form>
        </div>
    )
}

export default Register
