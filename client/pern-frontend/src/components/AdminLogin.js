import React, { useState } from 'react'
import './AdminLogin.scss'

const AdminLogin = ({ setAuth, setAdminAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const { email, password } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const [userRole, setRole] = useState('Admin')
    const setUserRole = (e) => {
        setRole(e.target.value)
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password, userRole };
            const response = await fetch(
                "http://localhost:5000/auth/admin-login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                setAdminAuth(true);
            } else {
                setAuth(false);
                setAdminAuth(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className="loginContainer">
            <img className="logo" src={require('./images/logo_2.png')} alt="" />
            <h2>Administrator Login</h2>
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
                <div className="inputSelect">
                    <center><label>Account Type: <br />
                        <select onChange={e => setUserRole(e)}>
                            <option value='Admin' name="Admin" >Admin</option>
                        </select>
                    </label></center>
                </div>
                <center><button type="submit" >Log In</button></center>
            </form>
        </div>
    )
}

export default AdminLogin
