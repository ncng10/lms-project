import React from 'react'
import Register from '../Register'
import "./LandingPage.scss"
import { CSSTransition } from 'react-transition-group'

function StudentRegistrationPage(props) {
    return (
        <div>
            <CSSTransition
                in={StudentRegistrationPage}
                appear={true}
                timeout={600}
                classNames="fade"><Register setAuth={props.setAuth} /></CSSTransition>
        </div>
    )
}

export default StudentRegistrationPage
