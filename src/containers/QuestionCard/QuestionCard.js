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
import ProgressDisplay from '../../components/ProgressDisplay/ProgressDisplay'
import TimeCountDownBar from '../../components/TimeCountDownBar/TimeCountDownBar'
import { HARD, MEDIUM, EASY } from '../../components/DifficultyButton/Difficulties'

const DIFFICULTIES = {hard: 'Hard', medium: 'Medium', easy: 'Easy'}
let sessionTimeoutHandle; //To clear timer not optimal I guess but it works...


class QuestionCard extends Component {

    state = {
        showNextButton: false,
        results: null,
        questionNumber: 0, //Zero-indexed array of questions
        answers: null,
        score: 0,
        questions: 10, //number of questions (for easy reading)
        time: 0 //ms
    }

    

    componentDidUpdate(){
        console.log('[state]: ', this.state)
        console.log('[QuestionsCard.js] Redux state:', this.props.difficulty)
        console.log('ShowNextButton', this.state.showNextButton)
        if (!this.state.showNextButton) {this.setShowNextButtonTimer(this.state.time);} //Timer
    }

    componentDidMount(){
        this.getQuizData()
        this.setTimeConfigurations()
    }

    setShowNextButtonTimer = (time) => {
        console.log('setShowNextButtonTimer')
        clearTimeout(sessionTimeoutHandle) //clear before setting new timer
        sessionTimeoutHandle = setTimeout(
            function() {
                this.setState({showNextButton: true});
            }.bind(this), time + 550 //Sync constant
        );
    }

    setTimeConfigurations = () => {
        console.log('this.props.difficulty: ', this.props.difficulty)
        let time = 0;
        switch(this.props.difficulty){
            case HARD: time = 10000; break;
            case MEDIUM: time = 15000; break;
            case EASY: time = 20000; break;
            default: time = 20000
        }
        this.setState({time: time})
        this.setShowNextButtonTimer(time)
    }

    getQuizData = () => {
        axios.get(`?amount=${this.state.questions}&difficulty=${this.props.difficulty}&encode=url3986`)
        .then(response => {
            if(response.data.response_code === 0){
                this.setState({results: response.data.results});
                console.log(response.data.results);
                this.spreadAnswer(this.state.questionNumber)
            }
            else{
                throw new Error('Opentdb Error: response_code: ' + response.data.response_code + '\nRead more about response codes here: https://opentdb.com/api_config.php');
            }
        }).catch(error => {
            console.log(error)
            console.log('Redirecting to main page')
            this.props.history.push('/errorPage')
        } //Change for better error handling in the future
        )
    }


    showNextButton = (answerKey) => {
        const answerClickedState = {
            ...this.state.answers
        }
        answerClickedState[answerKey].clicked = true
        if(answerClickedState[answerKey].correctAnswer){
            this.countScoreHandler()
        }

        this.setState({showNextButton: true, answers: answerClickedState, barWidth: 100})
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
                    <ProgressDisplay 
                        difficulty={DIFFICULTIES[this.props.difficulty]} 
                        questionNumber={this.state.questionNumber}
                        score={this.state.score} />
                    <Category category={this.state.results[this.state.questionNumber].category} />
                    <Question show>{this.state.results[this.state.questionNumber].question}</Question>
                    <TimeCountDownBar time={this.state.time} showNextButton={this.state.showNextButton} />
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

export default connect(mapStateToProps)(QuestionCard)
