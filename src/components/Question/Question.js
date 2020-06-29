import React from 'react'

import classes from './Question.module.css'

const question = (props) => {
    return (
        props.show ? <div className={classes.Question}>
            {decodeURIComponent(props.children)}
        </div> : null
    )
}

export default question
