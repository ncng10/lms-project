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
                "http://localhost:5000/dashboard/enroll",
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
        // onSubmit={e => onSubmitForm(e)}
        <div className="studentEnrollment">
            <form >
                <input onChange={e => { onChange(e); }} name="course_id" value={course_id} type="text" placeholder="Course ID">
                </input>
                <div><span>Enroll in a class</span></div>
            </form>

        </div>
    )
}

export default StudentEnroll
