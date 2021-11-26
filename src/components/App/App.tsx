import Footer from "components/Footer/Footer";
import HomePage from "pages/HomePage/HomePage";
import MapPage from "pages/MapPage/MapPage";
import SearchOccurencesPage from "pages/SearchOccurencesPage/SearchOccurencesPage";
import SingleOccurencePage from "pages/SingleOccurencePage/SingleOccurencePage";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/occurences/">
              <SearchOccurencesPage />
            </Route>
            <Route path="/occurences/:id">
              <SingleOccurencePage />
            </Route>
            <Route path="/map">
              <MapPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
