import React, { Component } from 'react'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import AuxContainter from '../AuxContainer/AuxContainer'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: false,
            errorMessage: null
        }


        componentDidMount(){
            console.log('[withErrorHandler] componentDidMount')
            console.log(axios.interceptors.request)
            axios.interceptors.request.use(req => {
                console.log('Request: ', req)
                this.setState({error: false});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: true, errorMessage: error});
                console.log('Error error: ', this.state.error)
            })
            console.log('end of comp did mount')
        }

        onReturnHandler = () => {
            this.setState({error: null})
            this.props.history.push('/')
        }

        render(){
            return(
                <AuxContainter>
                    <ErrorPage show={this.state.error} onClick={this.onReturnHandler} />
                    <WrappedComponent {...this.props}/>
                </AuxContainter>

            )
        }

    }
}

export default withErrorHandler