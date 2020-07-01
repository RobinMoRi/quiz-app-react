import React from 'react'
import classes from './ScoreBoard.module.css'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'

const scoreBoard = (props) => {
    let scoreMessage = ''
    if(props.score <= Math.floor(props.questions*0.3)){
        scoreMessage = 'That Was Bad...'
    }
    else if(Math.floor(props.questions*0.3) < props.score < Math.floor(props.questions*0.6)){
        scoreMessage = 'Nice Try!'
    }
    else if(Math.floor(props.questions*0.6) <= props.score <= Math.floor(props.questions*0.7)){
        scoreMessage = 'Well Done!'
    }
    else{
        scoreMessage = 'Congratulations!'
    }


    return (
        <AuxContainer>
            <div className={[classes.ScoreBoard, classes.Congratulation].join(' ')}><strong>{scoreMessage}</strong></div>
            <div className={classes.ScoreBoard}><strong>Your score is: {props.score}</strong> of {props.questions}</div>
        </AuxContainer>

    )
}

export default scoreBoard
