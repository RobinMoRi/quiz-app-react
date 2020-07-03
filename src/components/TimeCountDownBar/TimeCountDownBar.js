import React from 'react'
import classes from './TimeCountDownBar.module.css'

const timeCountDownBar = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.progressBar}>
                <span className={classes.progressBarFill} ></span>
            </div>
        </div>
    )
}

export default timeCountDownBar