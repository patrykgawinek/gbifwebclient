import Footer from "components/Footer/Footer";
import HomePage from "pages/HomePage/HomePage";
import MapPage from "pages/MapPage/MapPage";
import SearchOccurencesPage from "pages/SearchOccurencesPage/SearchOccurencesPage";
import SingleOccurencePage from "pages/SingleOccurencePage/SingleOccurencePage";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";

export const Theme = createContext({ darkMode: false, setDarkMode: (mode: boolean) => {} });

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <Theme.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
      <Router>
        <div
          className={
            darkMode ? `${styles.AppContainer} ${styles.darkMode}` : `${styles.AppContainer}`
          }
        >
          <div>
            <Header />
            <Switch>
              <Route path="/" exact>
                <div className={styles.mainContent}>
                  <HomePage />
                </div>
              </Route>
              <Route path="/occurences/" exact>
                <div className={styles.mainContent}>
                  <SearchOccurencesPage />
                </div>
              </Route>
              <Route path="/occurences/:id">
                <div className={styles.mainContent}>
                  <SingleOccurencePage />
                </div>
              </Route>
              <Route path="/map/:id?">
                <MapPage />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Theme.Provider>
  );
}

export default App;
