import React from 'react'
import classes from './DifficultyDisplay.module.css'

const DifficultyDisplay = (props) => {
    return (
        <div className={classes.DifficultyDisplay}>
            Difficulty: {props.difficulty}
        </div>
    )
}

export default DifficultyDisplay
