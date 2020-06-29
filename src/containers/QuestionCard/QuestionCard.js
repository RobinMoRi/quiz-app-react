import React, { Component } from 'react'

import classes from './QuestionCard.module.css'
import AnswerButton from '../../components/AnswerButton/AnswerButton'
import Question from '../../components/Question/Question'
import Button from '../../components/Button/Button'

class QuestionCard extends Component {
    state = {
        question: 'Sample question',
        answers: {
            'correct answer': true,
            'false answer 1 long answer long answer': false,
            'false answer 2': false,
            'false answer 3': false
        },
        nextButtonHidden: true,
    }

    showNextButton = () => {
        this.setState({nextButtonHidden: false})
    }


    //Update by fetching new questions
    nextQuestionHandler = () => {
        this.setState({nextButtonHidden: true})
    }


    render() {
        //Loop through answers and display as question
        const AnswerButtonJSX = Object.keys(this.state.answers)
            .map(answerKey => {
                return <AnswerButton key={answerKey}
                        showNext={this.showNextButton} >{answerKey}</AnswerButton>
            })


        return (
            <div className={classes.QuestionCard}>
                <Question>{this.state.question}</Question>
                {AnswerButtonJSX}
                <Button hidden={this.state.nextButtonHidden} onClick={this.nextQuestionHandler}>Next</Button>
            </div>
        )
    }
}

export default QuestionCard
