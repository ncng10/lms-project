import React from 'react'
import Login from '../Login'
import { CSSTransition } from 'react-transition-group'
function StudentLoginPage(props) {
    return (
        <div>
            <CSSTransition
                in={StudentLoginPage}
                appear={true}
                timeout={600}
                classNames="fade"><Login setAuth={props.setAuth} /></CSSTransition>
        </div>
    )
}

export default StudentLoginPage
