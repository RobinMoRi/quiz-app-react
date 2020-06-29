import React, { Component } from 'react'

import classes from './QuestionCard.module.css'
import AnswerButton from '../../components/AnswerButton/AnswerButton'
import Question from '../../components/Question/Question'
import Button from '../../components/Button/Button'
import axios from '../../axios-quiz'
import Spinner from '../../components/UI/Spinner/Spinner'

class QuestionCard extends Component {
    state = {
        showNextButton: false,
        results: null,
        questionNumber: 0,
        answers: null
    }

    componentDidMount(){
        axios.get('?amount=10')
        .then(response => {
            this.setState({results: response.data.results});
            console.log(response.data.results);
            this.spreadAnswer()
        })
    }


    showNextButton = () => {
        let currentQuestionNumber = {
            ...this.state.questionNumber
        }
        const newQuestionNumber = currentQuestionNumber + 1

        this.setState({...this.state, nextButtonHidden: false, questionNumber: newQuestionNumber})
        console.log(this.state.questionNumber)
    }


    //Update by fetching new question??
    nextQuestionHandler = () => {
        this.setState({...this.state, nextButtonHidden: true})
    }

    spreadAnswer = () => {
        const incorrectAnswers = {
            ...this.state.results[this.state.questionNumber].incorrect_answers
        }

        console.log('incorrect answers: ', incorrectAnswers)
        let answers = Object.keys(incorrectAnswers)
            .map(incorrectAnswer => {
                return incorrectAnswers[incorrectAnswer]
        })
        answers.push(this.state.results[this.state.questionNumber].correct_answer)

        const answersLength = answers.length
        let answerObject = answers.map((answer, iterator) => ({'answer': answer, 'correctAnswer': iterator === answersLength-1}));

        console.log('ANS: ', answerObject)
        this.setState({...this.state, answers: answerObject})
     }

    render() {
        //Loop through answers and display as question
        let question = <Spinner/>
        let answers = <Spinner/>
        if(this.state.results){
            console.log('debugging',this.state.questionNumber)
            question = (
                <Question>{this.state.results[this.state.questionNumber].question}</Question>
            )
        }

        if(this.state.answers){
            console.log('Testing ', this.state.answers)     
            answers = Object.keys(this.state.answers)
                .map(answerKey => {
            return <AnswerButton 
                        key={answerKey}
                        showNext={this.showNextButton}>{this.state.answers[answerKey].answer}
                    </AnswerButton>
            })
        }
        
        return (
            <div className={classes.QuestionCard}>
                {question}
                {answers}
                <Button show={this.state.showNextButton} onClick={this.nextQuestionHandler}>Next</Button>
            </div>
        )
    }
}

export default QuestionCard
