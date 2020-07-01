import React, { Component } from 'react'

import classes from './StartPage.module.css'
import Button from '../../components/Button/Button'
import DifficultyButton from '../../components/DifficultyButton/DifficultyButton'

const DIFFICULTIES = [{value: 'easy', displayValue: 'Easy'}, {value: 'medium', displayValue: 'Medium'}, {value: 'hard', displayValue: 'Hard'}]

class StartPage extends Component {

    state = {
        difficulty: 'easy'
    }

    componentDidUpdate(){
        console.log('[state]: ', this.state)
    }

    changeDifficultyHandler = (value) => {
        this.setState({difficulty: value})
        console.log('clicked ', value)
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
                        clicked={() => this.changeDifficultyHandler(object.value)}
                    />
            )}
        </div>)



        return (
            <div className={classes.StartPage}>
                {difficultyButton}
                <Button show onClick={this.onStartQuizHandler}>Start Quiz!</Button>
            </div>
        )
    }
}

export default StartPage