import React from 'react'
import classes from './Button.module.css'

const button = (props) => {
    return (
        props.show ? <button className={classes.Button} {...props}><strong>{props.children}</strong></button> : null
    )
}

export default button
