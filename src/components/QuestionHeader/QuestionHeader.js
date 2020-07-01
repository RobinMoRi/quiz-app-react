import React from 'react'
import classes from './QuestionHeader.module.css'

const questionHeader = (props) => {
    return (
        props.show ?
        <div className={classes.QuestionHeader}>
            <strong>Question {props.questionNumber}</strong> of {props.questions}
        </div> : null
    )
}

export default questionHeader
