import Footer from "components/Footer/Footer";
import HomePage from "pages/HomePage/HomePage";
import MapPage from "pages/MapPage/MapPage";
import SearchOccurrencesPage from "pages/SearchOccurrencesPage/SearchOccurrencesPage";
import SingleOccurrencePage from "pages/SingleOccurrencePage/SingleOccurrencePage";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";

export const Theme = createContext({ darkMode: true, setDarkMode: (mode: boolean) => {} });

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <Theme.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
      <Router>
        <div className={`${styles.AppContainer} ${darkMode ? styles.darkMode : undefined}`}>
          <Header />
          <Switch>
            <Route path="/" exact>
              <div className={styles.mainContent}>
                <HomePage />
              </div>
            </Route>
            <Route path="/occurrences/" exact>
              <div className={styles.mainContent}>
                <SearchOccurrencesPage />
              </div>
            </Route>
            <Route path="/occurrences/:id">
              <div className={styles.mainContent}>
                <SingleOccurrencePage />
              </div>
            </Route>
            <Route path="/map/:id?">
              <MapPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Theme.Provider>
  );
}

export default App;
