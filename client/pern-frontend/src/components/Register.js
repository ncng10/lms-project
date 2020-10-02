import React, { useState } from 'react'

function Register({ setAuth }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
        userRole: "Employee"
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
        <div>
            <form onSubmit={onSubmitForm}>
                <label>Email:
          <input type="email"
                        required={true}
                        name="email"
                        value={email}
                        onChange={(event) => onChange(event)} />
                </label>
                <label>Password:
          <input type="password"
                        required={true}
                        minLength="6"
                        name="password"
                        value={password}
                        onChange={(event) => onChange(event)} />
                </label>
                <label>Name/Username:
           <input
                        required={true}
                        type="text" name="name"
                        value={name}
                        onChange={(event) => onChange(event)} />
                </label>
                <label>
                    Type:
                    <select>
                        <option value={userRole} defaultValue="Employee" >Employee</option>
                    </select>
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
