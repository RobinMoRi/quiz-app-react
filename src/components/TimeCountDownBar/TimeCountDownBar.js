import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

class TimeCountDownBar extends Component {
    render() {

        const barWidth = this.props.showNextButton ? 100 : 0

        const fillLapse = keyframes`{
            0% {
                width: ${barWidth}%;
            }
            100% {
                width: 100%;
            }
        }`

        const TimeCountDown = styled.div`
            width: 100%;
            height: 2px;
            background-color: rgb(11, 0, 77);
            margin-top: 5px;
            margin-bottom: 10px;
            animation: ${fillLapse} ${this.props.time}ms ease-in;
        `
        return (
            <TimeCountDown></TimeCountDown>
        )
    }
}

export default TimeCountDownBar
