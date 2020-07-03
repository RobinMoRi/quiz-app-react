import React, { Component } from 'react'
import classes from './ErrorPage.module.css'
import Button from '../Button/Button'
import { withRouter} from 'react-router-dom';

export class ErrorPage extends Component {

    onReturnHandler = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            this.props.show ? <div className={classes.ErrorPage}>
                <div className={classes.ErrorTitle}>
                    Ooops! Something went wrong
                </div>
                <Button show={this.props.show} onClick={this.onReturnHandler}>Return to start</Button>
            </div> : null
        )
    }
}

export default withRouter(ErrorPage)