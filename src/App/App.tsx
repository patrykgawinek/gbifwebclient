import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import { HomePage } from "../pages/HomePage";
import { MapPage } from "../pages/MapPage";
import { SearchOccurrencesPage } from "../pages/SearchOccurrencesPage";
import { SingleOccurrencePage } from "../pages/SingleOccurrencePage";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Theme = createContext({
  darkMode: true,
  setDarkMode: (_mode: boolean) => {},
});

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    let data = localStorage.getItem("theme");
    if (data === "false") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Theme.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
      <Router>
        <div className={`${styles.AppContainer} ${darkMode ? styles.darkMode : undefined}`}>
          <Header />
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <div className={styles.mainContent}>
                    <HomePage />
                  </div>
                }
              />
              <Route path="occurrences">
                <Route
                  index
                  element={
                    <div className={styles.mainContent}>
                      <SearchOccurrencesPage />
                    </div>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <div className={styles.mainContent}>
                      <SingleOccurrencePage />
                    </div>
                  }
                />
              </Route>
              <Route path="map" element={<MapPage />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Theme.Provider>
  );
};
