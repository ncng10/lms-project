import React, { useState } from 'react'

function StudentEnroll() {
    const [inputs, setInputs] = useState({
        course_id: ""
    })
    const { course_id } = inputs;
    const onChange = (e) => {
        setInputs({ [e.target.name]: e.target.value });
        console.log(course_id)
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { course_id };
            const response = await fetch(
                "/dashboard/enroll",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            console.log(parseRes)
        } catch (err) {
            console.error(err.message);
        }
    };



    return (

        <div onSubmit={e => onSubmitForm(e)} className="studentEnrollment">
            <form style={{ backgroundColor: 'white' }}>
                <input onChange={e => { onChange(e); }} name="course_id" value={course_id} type="text" placeholder="Course ID">
                </input>
                <div style={{ backgroundColor: 'white' }}><span style={{ backgroundColor: 'white' }}>Enroll in a class</span></div>
                <button type="submit">Enroll</button>
            </form>

        </div>
    )
}

export default StudentEnroll
