import React from 'react';
import {Route, Switch } from 'react-router-dom'

import classes from './App.module.css'
import QuestionCard from './containers/QuestionCard/QuestionCard'
import StartPage from './containers/StartPage/StartPage'
import ErrorPage from './components/ErrorPage/ErrorPage'

function App() {
  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/quiz" component={QuestionCard} />
        <Route path="/errorPage" component={() => <ErrorPage show />} />
      </Switch>
    </div>
  );
}

export default App;
