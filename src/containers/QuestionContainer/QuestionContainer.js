import React from 'react'

import classes from './QuestionContainer.module.css'

const questionContainer = (props) => {
    return (
        props.show? <div className={classes.QuestionContainer}>
            {props.children}
        </div> : null
    )
}

export default questionContainer
