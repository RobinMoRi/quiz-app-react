import React from 'react'

import classes from './AnswerButton.module.css'

const answerButton = (props) => {
    let buttonClass = [classes.AnswerButton]
    if(props.showCorrect && props.nextButtonShown){
        buttonClass.push(classes.CorrectAnswer)
    }else if(!props.showCorrect && props.nextButtonShown && props.clicked){
        buttonClass.push(classes.FalseAnswer)
    }
    

    return (
        props.show ? <div className={buttonClass.join(' ')} onClick={props.showNext}>
            {decodeURIComponent(props.children)}
        </div> : null
    )
}

export default answerButton
