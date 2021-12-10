import { Navbar } from "react-bootstrap";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Navbar bg="primary" variant="dark">
        <p className={styles.footerText}>
          GBIF Client | &copy;{new Date().getFullYear()} | Project for AP Hogeschool - Patryk
          Gawinek{" "}
        </p>
      </Navbar>
    </footer>
  );
};

export default Footer;
