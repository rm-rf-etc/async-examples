import React from 'react';
import './App.css';

const App = ({ action }) =>
  <div className="App">
    <header className="App-header">
      <button onClick={() => action()}>Async Stuff</button>
    </header>
  </div>

export default App;
