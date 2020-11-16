import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { BiFile, BiEdit, BiTask } from "react-icons/bi";
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
        <div
            style={{ marginBottom: 25 }}
            className="studentTopBar">
            <div style={{ display: 'flex', float: 'right', marginRight: 15 }} className="userIcons">
                <div className="mailIcon"><MailOutlineIcon style={{ fontSize: 45 }} /></div>
                <div onClick={props.menuFunctionality} style={{ marginLeft: 15, backgroundColor: randomColor, width: 50, height: 50, display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 25 }} className="letterIcon">{firstLetter}</div>
                <center>
                    {props.menuActive ?
                        <div className="popupMenu">
                            <div className="pointer"></div>
                            <h3>Hello, {props.name} ({props.role})</h3>
                            <div className="topMenuLinks">
                                <div className="filesTopMenu">
                                    <Link to="/files"><div><BiFile fontSize="40" /></div></Link>
                                    <span>Files</span>
                                </div>
                                <div className="editProfileTopMenu">
                                    <div><BiEdit fontSize="40" /></div>
                                    <span>Edit Profile </span>
                                </div>
                                <div className="todoTopMenu">
                                    <div><BiTask fontSize="40" /></div>
                                    <span>Todo List</span>
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
