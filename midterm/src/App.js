import React from 'react';
import './App.css';
import DisplayMap from './pages/displayMap.js';
import Header from "./components/header.js"

function App() {
  return (
    <div className="App">
    	<Header/>
    	<DisplayMap/>
    </div>
  )
}

export default App;
