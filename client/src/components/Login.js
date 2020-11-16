import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputContainer, LoginPage, Logo } from '../styled-components/LoginStyles'
const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const { email, password } = inputs;
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const [userRole, setRole] = useState('Student')
    const setUserRole = (e) => {
        setRole(e.target.value)
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password, userRole };
            const response = await fetch(
                "/auth/login",
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
            } else {
                setAuth(false);
            }
        } catch {
        }
    };
    return (
        <React.Fragment>
            <LoginPage>
                <InputContainer>
                    <img
                        style={{ width: 75, height: 125 }}
                        className="logo"
                        src={require('./images/logo_2.png')} alt="" />
                    <h3>Swift Learning Management System</h3>
                    <form onSubmit={onSubmitForm}>
                        <div className="input">
                            <label>
                                <br />
                                <input placeholder="Email" name="email"
                                    value={email}
                                    type="text"
                                    onChange={e => onChange(e)} />
                            </label>
                        </div>
                        <div className="input">
                            <label>
                                <br />
                                <input name="password"
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                    onChange={e => { onChange(e); console.log(userRole) }} />
                            </label>
                        </div>
                        <div className="inputSelect">
                            <center><label>Account Type: <br />
                                <select onChange={e => setUserRole(e)}>
                                    <option value='Student' name="Student" >Student</option>
                                </select>
                            </label></center>
                        </div>
                        <center>
                            <button
                                style={{ width: 200, border: '1px solid white' }}
                                type="submit" >Log In</button>
                        </center>
                    </form>
                    <div className="adminLoginLink">
                        <span>Administrators and instructors login </span><span><a style={{ textDecoration: 'none', color: '#7692F8' }} href="/admin-login">here</a>.</span>
                    </div>
                </InputContainer>
            </LoginPage>
        </React.Fragment>
    )
}

export default Login
