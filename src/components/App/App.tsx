import HomePage from "pages/HomePage/HomePage";
import SingleOccurencePage from "pages/SingleOccurencePage/SingleOccurencePage";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./App.module.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/occurences/:id">
            <SingleOccurencePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
