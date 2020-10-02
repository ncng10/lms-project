import React, { useState } from 'react'

const AdminLogin = ({ setAuth }) => {

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
                "http://localhost:5000/auth/login",
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
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h2>Log into your account</h2>
            <form onSubmit={onSubmitForm}>
                <label>Email:
                <input name="email"
                        value={email}
                        type="text"
                        onChange={e => onChange(e)} />
                </label>

                <label>Password:
                <input name="password"
                        value={password}
                        type="password"
                        onChange={e => { onChange(e); console.log(userRole) }} />
                </label>
                <label>
                    <select onChange={e => setUserRole(e)}>
                        <option value="Employee" name="Employee" >Employee</option>
                        <option value='Admin' name="Admin" >Admin</option>
                    </select>
                </label>
                <button type="submit" >Log In</button>
            </form>

        </div >
    )
}

export default AdminLogin
