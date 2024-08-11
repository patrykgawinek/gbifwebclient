import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import { HomePage } from "src/pages/HomePage";
import { MapPage } from "src/pages/MapPage";
import { SearchOccurrencesPage } from "src/pages/SearchOccurrencesPage";
import { SingleOccurrencePage } from "src/pages/SingleOccurrencePage";

import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";

export const Theme = createContext({
  darkMode: true,
  setDarkMode: (_mode: boolean) => {
    return;
  },
});

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const data = localStorage.getItem("theme");
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
