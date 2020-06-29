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
        answers: null,
        showQuestion: false,
        score: 0,
        questions: 10
    }

    componentDidUpdate(){
        console.log('This state', this.state)
    }

    componentDidMount(){
        axios.get('?amount=10&difficulty=easy&encode=url3986')
        .then(response => {
            this.setState({results: response.data.results});
            console.log(response.data.results);
            this.spreadAnswer(0)
        })
    }


    showNextButton = (answerKey) => {
        const answerClickedState = {
            ...this.state.answers
        }
        answerClickedState[answerKey].clicked = true
        if(answerClickedState[answerKey].correctAnswer){
            this.countScoreHandler()
        }

        this.setState({showNextButton: true, answers: answerClickedState})
        console.log('score', this.state.score)
    }

    countScoreHandler = () => {
        let newScore = this.state.score
        newScore = newScore + 1
        this.setState({score: newScore})
    }

    answerIsCorrect(answerKey){
        const answer = {
            ...this.state
        }
        return answer.answers[answerKey].correctAnswer
    }


    //Update by fetching new question??
    nextQuestionHandler = () => {
        let currentState = {
            ...this.state
        }
        const newQuestionNumber = currentState.questionNumber + 1
        this.setState({showNextButton: false, questionNumber: newQuestionNumber})
        this.spreadAnswer(newQuestionNumber)
    }

    spreadAnswer = (questionNumber) => {
        const incorrectAnswers = {
            ...this.state.results[questionNumber].incorrect_answers
        }

        let answers = Object.keys(incorrectAnswers)
            .map(incorrectAnswer => {
                return incorrectAnswers[incorrectAnswer]
        })
        answers.push(this.state.results[questionNumber].correct_answer)

        const answersLength = answers.length
        let answerArray = answers
                            .map((answer, iterator) => ({
                                'answer': answer, 'correctAnswer': iterator === answersLength-1, 'clicked': false
                            }));
        answerArray = this.shuffleArray(answerArray)
        this.setState({answers: answerArray})
     }

     shuffleArray(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
     }

     onStartHandler = () => {
        this.setState({showQuestion: true})
     }

    render() {
        //Loop through answers and display as question
        let question = <Spinner/>
        let answers = <Spinner/>
        if(this.state.results  && this.state.questionNumber < this.state.questions){
            console.log('debugging',this.state.questionNumber)
            question = (
                <Question show={this.state.showQuestion}>{this.state.results[this.state.questionNumber].question}</Question>
            )
        }

        if(this.state.answers && this.state.questionNumber < this.state.questions){
            console.log('Testing ', this.state.answers)     
            answers = Object.keys(this.state.answers)
                .map(answerKey => {
            return <AnswerButton 
                        key={answerKey}
                        showNext={() => this.showNextButton(answerKey)}
                        show={this.state.showQuestion}
                        showCorrect={this.answerIsCorrect(answerKey)}
                        nextButtonShown={this.state.showNextButton}
                        clicked={this.state.answers[answerKey].clicked}>{this.state.answers[answerKey].answer}
                    </AnswerButton>
            })
        }

        let buttons = ''
        if(this.state.questionNumber < this.state.questions){
            buttons = (<div>
                <Button show={this.state.showNextButton} onClick={this.nextQuestionHandler}>Next Question</Button>
                <Button show={!this.state.showQuestion} onClick={this.onStartHandler}>Start Quiz!</Button>  
            </div>)
        }
        
        return (
            <div className={classes.QuestionCard}>
                {question}
                {answers}
                {buttons}
            </div>
        )
    }
}

export default QuestionCard
