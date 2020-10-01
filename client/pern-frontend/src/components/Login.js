import React, { Fragment, useState } from 'react'

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password }
            const response = await fetch("http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json();
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            console.log(parseRes)
        } catch (err) {
            console.log(err.message);
        }
    }
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
                        onChange={e => onChange(e)} />
                </label>
                <button type="submit">Log In</button>
            </form>

        </div>
    )
}

export default Login
