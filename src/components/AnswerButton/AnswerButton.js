import React from 'react'

import classes from './AnswerButton.module.css'

const answerButton = (props) => {
    return (
        <div className={classes.AnswerButton} onClick={props.showNext}>
            {props.children}
        </div>
    )
}

export default answerButton
