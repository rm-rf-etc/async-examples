import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

const App = ({ stopStreaming, jsonBlob }) =>
  <div className="App">
    <header className="App-header">
      <button onClick={() => stopStreaming()}>Stop</button>
    </header>
    <div>{ jsonBlob }</div>
  </div>

App.PropTypes = {
	startStreaming: PropsTypes.func.isRequired,
	stopStreaming: PropsTypes.func.isRequired,
	jsonBlob: PropTypes.object.isRequired,
};

export default App;
