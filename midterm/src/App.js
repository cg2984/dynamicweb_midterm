import React from 'react';
import './App.css';
import DisplayMap from './pages/displayMap.js';
import Header from "./components/header.js";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <div className="SiteWrapper">
      <Router>
      	<Switch>
      		<Route path="/">
      		<DisplayMap/>
      		</Route>
      	</Switch>
      </Router>
    </div>
  );
}

export default App;
