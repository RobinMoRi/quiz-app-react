import React from 'react'

import classes from './Question.module.css'

const question = (props) => {
    return (
        <div className={classes.Question}>
            {props.children}
        </div>
    )
}

export default question
