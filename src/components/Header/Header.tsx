import { Button, Container, Nav, Navbar } from "react-bootstrap";
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
            <NavLink to="/occurences" className="nav-link">
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
            {darkMode ? "Dark mode" : "Light mode"}
          </Button>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
