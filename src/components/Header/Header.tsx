import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Theme } from "src/App";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useContext(Theme);
  const handleDarkMode = () => () => setDarkMode(!darkMode);

  return (
    <header>
      <Navbar expand="sm" className={darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-dark"}>
        <Container>
          <NavLink to="/" className={styles.brand}>
            <Navbar.Brand>GBIF Client</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
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
              onClick={handleDarkMode()}
            >
              <img
                className={styles.modeButtonIcon}
                src={darkMode ? "/assets/icons/moon.png" : "/assets/icons/sun.png"}
                alt={darkMode ? "Dark mode" : "Light mode"}
              />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
