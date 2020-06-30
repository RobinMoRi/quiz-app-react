import React from 'react'

import classes from './Question.module.css'

const question = (props) => {
    return (
        props.show ? <div className={classes.Question}>
            <strong>{decodeURIComponent(props.children)}</strong>
        </div> : null
    )
}

export default question
