import React from 'react';
import './App.css';
import {Settlement} from './Settlement'
import {Interval} from "./Interval";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Iris</h1>
        <Interval interval={5 * 60 * 1000}>
          <Settlement/>
        </Interval>
      </header>
    </div>
  );
}

export default App;
