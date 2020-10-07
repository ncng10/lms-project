import React, { useState } from 'react'
import './StudentDashboard.scss'
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function StudentTopBar(props) {
    const user = props.name;
    let firstLetter = user.charAt(0);
    const colorPallete = [
        'rgb(189,240,167)', 'rgb(221,226,147)',
        'rgb(180,167,240)', 'rgb(240,167,167)',
    ]
    let randomColor = colorPallete[Math.floor(Math.random() * colorPallete.length)]


    const [menuActive, setMenuActive] = useState(false);
    function menuFunctionality() {
        if (!menuActive) {
            setMenuActive(true)
        } else {
            setMenuActive(false)
        }
    }
    return (
        <div className="studentTopBar">
            <div className="userIcons">
                <div className="mailIcon"><MailOutlineIcon style={{ fontSize: 45 }} /></div>
                <div onClick={menuFunctionality} style={{ backgroundColor: randomColor }} className="letterIcon">{firstLetter}</div>
                <center>
                    {menuActive ?
                        <div className="popupMenu">
                            <div className="pointer"></div>
                            <h3>Hello, {props.name} ({props.role})</h3>
                            <button onClick={() => { props.setAuth(false); props.removeToken(); }}>Logout</button>
                        </div> : null}
                </center>
            </div>
        </div>
    )
}

export default StudentTopBar
