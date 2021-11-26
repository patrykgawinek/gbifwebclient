import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>Logo</p>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/occurences">
              Search
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/map">
              Map
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
