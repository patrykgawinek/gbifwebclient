import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(Theme);

  return (
    <header>
      <Navbar className={darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-dark"}>
        <Container>
          <NavLink to="/">
            <Navbar.Brand>GBIF Client</Navbar.Brand>
          </NavLink>
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
            className={darkMode ? "btn-dark" : "btn-primary"}
            onClick={() => setDarkMode(!darkMode)}
          >
            <img width="30px" src={darkMode ? "assets/icons/moon.png" : "assets/icons/sun.png"} />
          </Button>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
