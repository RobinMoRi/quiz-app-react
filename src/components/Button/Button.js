import React from 'react'
import classes from './Button.module.css'

const button = (props) => {
    return (
        props.show ? <button className={classes.Button} onClick={props.onClick} disabled={props.disabled}><strong>{props.children}</strong></button> : null
    )
}

export default button
