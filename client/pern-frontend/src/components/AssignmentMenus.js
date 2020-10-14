import React, { useEffect, useState } from 'react'
import './AssignmentMenu.scss'
function AssignmentMenus() {
    const [assignmentGroups, setAssignmentGroups] = useState([]);
    const [assignmentGroupsMaterial, setAssignmentGroupsMaterial] = useState([]);

    async function getAssignmentGroupsMaterial() {
        try {
            const response = await fetch("http://localhost:5000/course-page/assignment-groups-material",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setAssignmentGroupsMaterial(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.log(err.message)
        }
    }

    async function getAssignmentGroups() {
        try {
            const response = await fetch("http://localhost:5000/course-page/assignment-groups",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setAssignmentGroups(parseRes);
            console.log(parseRes);
        } catch (err) {
            console.log(err.message)
        }
    }

    const [contentShowing, setContentShowing] = useState(false);

    function toggleMenu() {
        if (!contentShowing) {
            setContentShowing(true)
        } else {
            setContentShowing(false);
        }
    }

    useEffect(() => {
        getAssignmentGroups();
    }, []);

    useEffect(() => {
        getAssignmentGroupsMaterial();
    }, []);
    //     <div key={assignmentGroup.assignment_group_id} className="assignmentCategoryTopBarName">
    //     <h1>{assignmentGroup.assignment_group_name}</h1>
    // </div>

    return (
        <div className="pageBody">
            {assignmentGroups.map((assignmentGroup) => (
                <div onClick={toggleMenu} className="assignmentMenu">
                    {assignmentGroup.assignment_group_name}
                    <div className="contentItemShowing">
                        {assignmentGroup.assignment_name}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default AssignmentMenus
