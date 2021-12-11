import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(Theme);

  return (
    <header>
      <Navbar expand="sm" className={darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-dark"}>
        <Container>
          <NavLink to="/">
            <Navbar.Brand>GBIF Client</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" exact className="nav-link">
                How-to
              </NavLink>
              <NavLink to="/occurrences" className="nav-link">
                Search
              </NavLink>
              <NavLink to="/map" className="nav-link">
                Map
              </NavLink>
            </Nav>
            <Button
              className={`${styles.themeToggle} ${darkMode ? "btn-dark" : "btn-primary"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <img
                className={styles.modeButtonIcon}
                src={darkMode ? "assets/icons/moon.png" : "assets/icons/sun.png"}
                alt={darkMode ? "Dark mode" : "Light mode"}
              />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
