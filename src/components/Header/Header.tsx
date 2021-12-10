import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(Theme);

  return (
    <header>
      <Navbar className={darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-dark"}>
        <Container>
          <Navbar.Brand href="/">GBIF Client</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/occurences">Search</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
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
