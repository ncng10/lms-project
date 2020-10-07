import React from 'react'

function CourseCard(props) {
    const colorPallete = [
        '#FF9035', 'rgb(251,211,150)',
        '#5F8CFF', 'rgb(240,167,167)',
    ]
    let randomColor = colorPallete[Math.floor(Math.random() * colorPallete.length)]

    return (
        <div style={{ backgroundColor: randomColor }} className="courseCard">
            <div className="courseImageSection">
                <img className="courseImage" src={require('../art-icon.png')} alt="" />
            </div>
            <div style={{ backgroundColor: 'white' }} className="courseInfoSection">
                <h2>{props.courseName}</h2>
                <h3>Professor: Nolan Cong, PhD</h3>
                <h3>Course #: 1120291</h3>
            </div>
        </div>
    )
}

export default CourseCard
