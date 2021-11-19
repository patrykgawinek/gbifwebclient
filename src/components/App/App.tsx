import HomePage from "pages/HomePage/HomePage";
import SingleOccurencePage from "pages/SingleOccurencePage/SingleOccurencePage";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./App.module.css";

function App() {
  let id: number = 5;
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/occurences/:id">
            <SingleOccurencePage id={id} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
