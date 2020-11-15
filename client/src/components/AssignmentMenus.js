import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './AssignmentMenu.scss'
function AssignmentMenus() {
    const [assignmentGroupsMaterial, setAssignmentGroupsMaterial] = useState([]);
    const { courseID } = useParams();
    async function getAssignmentGroupsMaterial() {
        try {
            const response = await fetch(`/course-page/assignment-groups-material/${courseID}`,
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

    useEffect(() => {
        getAssignmentGroupsMaterial();
    });
    return (
        <div className="pageBody">
            {assignmentGroupsMaterial.map((assignmentGroup) => (
                <div className="contentItemShowing">
                    <h3>{assignmentGroup.assignment_name} ({assignmentGroup.assignment_group_name})</h3>
                </div>
            ))}
        </div>

    )
}

export default AssignmentMenus
