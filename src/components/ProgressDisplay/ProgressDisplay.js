import React from 'react'
import classes from './ProgressDisplay.module.css'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'

const ProgressDisplay = (props) => {
    return (
        <AuxContainer>
            <div className={classes.ProgressDisplay}>Difficulty: {props.difficulty}</div>
            <div className={classes.ProgressDisplay}>Score: {props.score}/{props.questionNumber}</div>
        </AuxContainer>

    )
}

export default ProgressDisplay
