import React, { Component } from 'react'

import classes from './StartPage.module.css'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

const DIFFICULTIES = [{value: 'easy', displayValue: 'Easy'}, {value: 'medium', displayValue: 'Medium'}, {value: 'hard', displayValue: 'Hard'}]

class StartPage extends Component {

    testHandler = (event) => {
        console.log('value: ', event.target.value)
    }

    onStartQuizHandler = () => {
        this.props.history.push('/quiz');
    }

    render() {
        return (
            <div className={classes.StartPage}>
                {/* <Input changed={(event) => this.testHandler(event)} values={DIFFICULTIES}/> */}
                <Button show onClick={this.onStartQuizHandler}>Start Quiz!</Button>
            </div>
        )
    }
}

export default StartPage