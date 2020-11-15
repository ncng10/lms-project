import React from 'react'
import AdminLogin from '../AdminLogin'
import "./StudentLogin.scss";
import { CSSTransition } from 'react-transition-group'

function AdminLoginPage(props) {
    return (
        <div>
            <CSSTransition
                in={AdminLoginPage}
                appear={true}
                timeout={600}
                classNames="fade"><AdminLogin setAuth={props.setAuth} setAdminAuth={props.setAdminAuth} /></CSSTransition>
        </div>
    )
}

export default AdminLoginPage
