import React, { Component } from 'react'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import AuxContainter from '../AuxContainer/AuxContainer'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidCatch(error){
            this.setState({error: error});
        }

        componentDidMount(){
            console.log('axios.interceptors.request', axios.interceptors.request)
            axios.interceptors.request.use(req => {
                console.log('req', req.data)
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        render(){
            return(
                <AuxContainter>
                    <ErrorPage show={this.state.error} />
                    <WrappedComponent {...this.props}/>}
                </AuxContainter>

            )
        }

    }
}

export default withErrorHandler