import React, { useState } from 'react'
import './StudentDashboard.scss'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { BiFile, BiEdit, BiTask, BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom';

function StudentTopBar(props) {
    const user = props.name;
    let firstLetter = user.charAt(0).toUpperCase();
    const colorPallete = [
        'rgb(189,240,167)', 'rgb(221,226,147)',
        'rgb(180,167,240)', 'rgb(240,167,167)',
    ]
    let randomColor = colorPallete[Math.floor(Math.random() * colorPallete.length)]

    return (
        <div className="studentTopBar">
            <div className="userIcons">
                <div className="mailIcon"><MailOutlineIcon style={{ fontSize: 45 }} /></div>
                <div onClick={props.menuFunctionality} style={{ backgroundColor: randomColor }} className="letterIcon">{firstLetter}</div>
                <center>
                    {props.menuActive ?
                        <div className="popupMenu">
                            <div className="pointer"></div>
                            <h3>Hello, {props.name} ({props.role})</h3>
                            <div className="topMenuLinks">
                                <div className="filesTopMenu">
                                    <Link to="/files"><div><BiFile fontSize="40" /></div></Link>
                                    <a><span>Files</span></a>
                                </div>
                                <div className="editProfileTopMenu">
                                    <div><BiEdit fontSize="40" /></div>
                                    <a><span>Edit Profile </span></a>
                                </div>
                                <div className="todoTopMenu">
                                    <div><BiTask fontSize="40" /></div>
                                    <a><span>Todo List</span></a>
                                </div>
                            </div>
                            <div className="logOutContainer"><button style={{ backgroundColor: randomColor }} onClick={() => { props.setAuth(false); props.removeToken(); }}>Logout</button></div>
                        </div> : null}
                </center>
            </div>
        </div>
    )
}

export default StudentTopBar
