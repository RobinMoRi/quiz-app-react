import React from 'react'

const scoreBoard = (props) => {
    return (
        <div>
            Your score is: {props.score}/{props.questions}
        </div>
    )
}

export default scoreBoard
