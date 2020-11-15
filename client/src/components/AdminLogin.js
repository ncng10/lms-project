import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../components/pages/AdminLogin.scss'
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
                "/auth/admin-login",
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
        <React.Fragment>
            <Link to="/">
                <div className="backButton"></div>
            </Link>
            <div className="loginContainer">
                <img className="logo" src={require('./images/logo_2.png')} alt="" />
                <h3>Swift LMS Admin Portal</h3>
                <form onSubmit={onSubmitForm}>
                    <div className="input">
                        <label>
                            <br />
                            <input name="email"
                                value={email}
                                placeholder="Email"
                                type="text"
                                onChange={e => onChange(e)} />
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <br />
                            <input name="password"
                                value={password} p
                                placeholder="Password"
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
                <div className="adminLoginLink">
                    <span>Students login </span><span><a style={{ textDecoration: 'none', color: '#7692F8' }} href="student-login">here</a>.</span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminLogin
