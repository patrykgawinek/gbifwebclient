import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <p className={styles.logo}>Logo</p>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>Search</li>
          <li>Map</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
