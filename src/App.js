import React from 'react';

import QuestionCard from './containers/QuestionCard/QuestionCard'
import classes from './App.module.css'

function App() {
  return (
    <div className={classes.App}>
      <QuestionCard />
    </div>
  );
}

export default App;
