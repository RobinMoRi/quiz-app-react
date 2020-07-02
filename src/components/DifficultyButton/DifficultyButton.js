import React from 'react'
import classes from './DifficultyButton.module.css'
import * as difficulties from './Difficulties'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'

const difficultyButton = (props) => {
    let buttonClass = [classes.DifficultyButton]
    if (props.clicked) buttonClass.push(classes.Clicked);

    switch(props.value){
        case difficulties.HARD:
            buttonClass.push(classes.Hard)
            if (props.clicked) buttonClass.push(classes.HardClicked);
            break;
        case difficulties.MEDIUM:
            buttonClass.push(classes.Medium)
            if (props.clicked) buttonClass.push(classes.MediumClicked);
            break;
        case difficulties.EASY:
            buttonClass.push(classes.Easy)
            if (props.clicked) buttonClass.push(classes.EasyClicked);
            break;
        default:
            break;
    }

    return (
        <AuxContainer style={{width: '90px'}}>
            <button className={buttonClass.join(' ')} onClick={props.onClick}>
                {props.displayValue}
            </button>
        </AuxContainer>
    )
}

export default difficultyButton