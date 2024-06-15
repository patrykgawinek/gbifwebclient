import { Navbar } from 'react-bootstrap';
import { Theme } from '../../App/App';
import { useContext } from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { darkMode } = useContext(Theme);

  return (
    <footer>
      <Navbar className={darkMode ? 'bg-dark navbar-dark' : 'bg-primary navbar-dark'}>
        <p className={styles.footerText}>
          GBIF Client | &copy;{new Date().getFullYear()} | Project for AP Hogeschool - Patryk Gawinek{' '}
        </p>
      </Navbar>
    </footer>
  );
};
