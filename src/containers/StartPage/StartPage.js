import React, { Component } from 'react'
import { connect } from "react-redux";

import classes from './StartPage.module.css'
import Button from '../../components/Button/Button'
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton'
import Title from '../../components/Title/Title'
import * as actions from '../../redux/actions/index'



const DIFFICULTIES = [{value: 'hard', displayValue: 'Hard'}, {value: 'medium', displayValue: 'Medium'}, {value: 'easy', displayValue: 'Easy'}]

class StartPage extends Component {

    state = {
        clicked: {
            hard: false,
            medium: false,
            easy: false
        }
    }

    componentDidUpdate(){
        console.log('[state]: ', this.state)
        console.log('Redux state', this.props.difficulty)
    }

    changeDifficultyHandler = (value) => {
        this.setState({difficulty: value})
        console.log('clicked ', value)

        let clicked = {
            ...this.state.clicked
        }
        clicked.hard = false
        clicked.medium = false
        clicked.easy = false
        clicked[value] = !clicked[value]

        this.setState({clicked: clicked})
        this.props.onSetDifficulty(value)
    }

    onStartQuizHandler = () => {
        this.props.history.push('/quiz');
    }

    render() {
        const difficultyButton = (
        <div style={{marginTop: '20px', marginBottom: '10px', height: '60px'}}>
            {DIFFICULTIES.map(object =>
                    <DifficultyButton 
                        key={object.value} 
                        value={object.value} 
                        displayValue={object.displayValue}
                        onClick={() => this.changeDifficultyHandler(object.value)}
                        clicked={this.state.clicked[object.value]}
                    />
            )}
        </div>)



        return (
            <div className={classes.StartPage}>
                <Title>Please select difficulty level </Title>
                {difficultyButton}
                <Button show onClick={this.onStartQuizHandler}>Start Quiz!</Button>
                <div style={{color: 'lightgrey', fontSize:'7pt'}}>Powered by: <a style={{color: 'lightgrey'}} href={'https://opentdb.com/'}>Open Trivia Database</a></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        difficulty: state.difficulty
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onSetDifficulty: (difficultyLevel) => dispatch(actions.setDifficulty(difficultyLevel))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)