import Footer from 'components/Footer/Footer';
import HomePage from 'pages/HomePage/HomePage';
import MapPage from 'pages/MapPage/MapPage';
import SearchOccurrencesPage from 'pages/SearchOccurrencesPage/SearchOccurrencesPage';
import SingleOccurrencePage from 'pages/SingleOccurrencePage/SingleOccurrencePage';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './App.module.css';

export const Theme = createContext({
  darkMode: true,
  setDarkMode: (_mode: boolean) => {},
});

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    let data = localStorage.getItem('theme');
    if (data === 'false') {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkMode));
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

export default App;
