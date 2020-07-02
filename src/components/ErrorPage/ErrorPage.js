import React, { Component } from 'react'
import classes from './ErrorPage.module.css'
import Button from '../Button/Button'

class ErrorPage extends Component {

    onReturnHandler = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className={classes.ErrorPage} show={this.props.show}>
                <div className={classes.ErrorTitle}>
                    Something went wrong!
                </div>
                <Button show={this.props.show} onClick={this.onReturnHandler}>Return to start</Button>
            </div>
        )
    }
}

export default ErrorPage