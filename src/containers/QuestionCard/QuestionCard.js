import React, { Component } from 'react'
import { connect } from "react-redux";

import classes from './QuestionCard.module.css'
import AnswerButton from '../../components/AnswerButton/AnswerButton'
import Question from '../../components/Question/Question'
import Button from '../../components/Button/Button'
import axios from '../../axios-quiz'
import Spinner from '../../components/UI/Spinner/Spinner'
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard'
import QuestionHeader from '../../components/QuestionHeader/QuestionHeader'
import QuestionContainer from '../../containers/QuestionContainer/QuestionContainer'
import AuxContainer from '../../hoc/AuxContainer/AuxContainer'
import Category from '../../components/Category/Category'
import DifficultyDisplay from '../../components/DifficultyDisplay/DifficultyDisplay'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const DIFFICULTIES = {hard: 'Hard', medium: 'Medium', easy: 'Easy'}

class QuestionCard extends Component {

    state = {
        showNextButton: false,
        results: null,
        questionNumber: 0, //Zero-indexed array of questions
        answers: null,
        score: 0,
        questions: 10 //number of questions (for easy reading)
    }

    componentDidUpdate(){
        console.log('[state]: ', this.state)
        console.log('[QuestionsCard.js] Redux state:', this.props.difficulty)
    }

    componentDidMount(){
        this.getQuizData()
    }

    getQuizData = () => {
        axios.get(`?amount=${this.state.questions}&difficulty=${this.props.difficulty}&encode=url3986`)
        .then(response => {
            this.setState({results: response.data.results});
            console.log(response.data.results);
            this.spreadAnswer(this.state.questionNumber)
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
        if(this.state.questionNumber < this.state.questions - 1){
            this.spreadAnswer(newQuestionNumber)
        }
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

        while (0 !== currentIndex) {

          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
     }

     onRestartHandler = () => {
        this.props.history.push('/');
     }

    render() {
        //Loop through answers and display as question
        let question = <Spinner/>
        if(this.state.results && (this.state.questionNumber < this.state.questions) && (this.state.questionNumber !== this.state.questions)){
            question = (
                <QuestionContainer show>
                    <QuestionHeader show
                                    questionNumber={this.state.questionNumber+1}
                                    questions={this.state.questions} />
                    <DifficultyDisplay difficulty={DIFFICULTIES[this.props.difficulty]} />
                    <Category category={this.state.results[this.state.questionNumber].category} />
                    <Question show>{this.state.results[this.state.questionNumber].question}</Question>
                </QuestionContainer>
            )
        }

        let answers = null
        if(this.state.answers && (this.state.questionNumber < this.state.questions) && (this.state.questionNumber !== this.state.questions)){
            answers = Object.keys(this.state.answers)
                .map(answerKey => {
            return <AnswerButton 
                        key={answerKey}
                        showNext={() => this.showNextButton(answerKey)}
                        show
                        showCorrect={this.answerIsCorrect(answerKey)}
                        nextButtonShown={this.state.showNextButton}
                        clicked={this.state.answers[answerKey].clicked}>{this.state.answers[answerKey].answer}
                    </AnswerButton>
            })
        }

        let nexButton = null
        if(this.state.results && (this.state.questionNumber < this.state.questions) && (this.state.questionNumber !== this.state.questions)){
            nexButton = (<div>
                <Button show={this.state.showNextButton} onClick={this.nextQuestionHandler}>Next Question</Button>
            </div>)
        }

        let scoreBoard = null
        if(this.state.questionNumber === this.state.questions){
            scoreBoard = (
                <AuxContainer>
                    <ScoreBoard score={this.state.score} questions={this.state.questions} />
                    <Button show={true} onClick={this.onRestartHandler} score={this.state.score} questions={this.state.questions}>Restart</Button>
                </AuxContainer>)
                            
            question = null
            answers = null
            nexButton = null
        }
        
        return (
            <div className={classes.QuestionCard}>
                {question}
                {answers}
                {nexButton}
                {scoreBoard}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        difficulty: state.difficulty
    }
}

export default connect(mapStateToProps)(withErrorHandler(QuestionCard, axios))
