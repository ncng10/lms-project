import React from 'react'
import './AdminNavBar.scss'

function AdminNavBar(props) {
    return (
        <div className="adminNavBar">
            <nav>
                <ul>
                    <li>Analytics</li>
                    <li>Roster</li>
                    <li>Admin Tools</li>
                    <li onClick={props.logOut}>Logout</li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminNavBar
