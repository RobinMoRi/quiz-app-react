import React from 'react'
import classes from './DifficultyButton.module.css'
import * as difficulties from './Difficulties'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'

const difficultyButton = (props) => {
    let buttonClass = [classes.DifficultyButton]
    switch(props.value){
        case difficulties.HARD:
            buttonClass.push(classes.Hard)
            break;
        case difficulties.MEDIUM:
            buttonClass.push(classes.Medium)
            break;
        case difficulties.EASY:
            buttonClass.push(classes.Easy)
            break;
        default:
            break;
    }
    return (
        <AuxContainer style={{width: '90px'}}>
            <button className={buttonClass.join(' ')} onClick={props.clicked}>
                {props.displayValue}
            </button>
        </AuxContainer>
    )
}

export default difficultyButton