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
        props.show ? <button className={buttonClass.join(' ')} 
        onClick={props.showNext}
        disabled={props.nextButtonShown}>
            {decodeURIComponent(props.children)}
        </button> : null
    )
}

export default answerButton
