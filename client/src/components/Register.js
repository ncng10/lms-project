import React, { useState } from 'react'
import './pages/Register.scss'
import { Link } from 'react-router-dom'
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
            const response = await fetch("/auth/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
        } catch {
        }
    }
    return (
        <React.Fragment>
            <Link to="/">
                <div className="backButton"></div>
            </Link>
            <div className="registrationContainer">
                <img className="logo" src={require('./images/logo_2.png')} alt="" />
                <h2>Student Registration</h2>
                <form onSubmit={onSubmitForm}>
                    <div className="input">
                        <label>
                            <br />
                            <input name="email"
                                placeholder="Email"
                                value={email}
                                type="text"
                                onChange={e => onChange(e)} />
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <input name="password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={e => { onChange(e); console.log(userRole) }} />
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <input
                                placeholder="Username"
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
        </React.Fragment>
    )
}

export default Register
