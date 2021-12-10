import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { darkMode } = useContext(Theme);

  return (
    <main>
      <h1 className={`mt-3 ${darkMode ? styles.lightText : undefined}`}>
        How do I use this web client?
      </h1>
    </main>
  );
};

export default HomePage;
