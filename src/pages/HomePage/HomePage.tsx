import { Theme } from '../../App/App';
import { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const { darkMode } = useContext(Theme);

  const navigate = useNavigate();
  const handleOnClick = () => navigate(`/occurrences`);

  return (
    <main>
      <Container>
        <h1 className={`mt-3 ${darkMode ? styles.lightText : undefined}`}>What is the GBIF Client web app?</h1>
        <p className={darkMode ? styles.lightText : undefined}>
          The GBIF Client web app is a front-end web app that gives you a more user friendly experience when accessing{' '}
          <a href="https://www.gbif.org/occurrence/search" className={darkMode ? styles.hyperLinkDark : undefined}>
            GBIF's
          </a>{' '}
          dataset. GBIF is an international network and data infrastructure funded by the world's governments and aimed
          at providing anyone, anywhere, open access to data about all types of life on Earth. This means that you can
          find data on a plethora of species and recorded occurrences of said species.
        </p>
        <h2 className={darkMode ? styles.lightText : undefined}>How do I use this web app?</h2>
        <p className={darkMode ? styles.lightText : undefined}>
          To use this web app, you can simply navigate to the{' '}
          <Link to="/occurrences" className={darkMode ? styles.hyperLinkDark : undefined}>
            search page
          </Link>{' '}
          and start browsing through different kingdoms, phyla ... Below the search section found occurrences will
          appear. You can select an occurrence to see more details, or you can click the button to show all occurrences
          on a heatmap.
        </p>
        <h2 className={darkMode ? styles.lightText : undefined}>
          What is the difference between the map button on the search page and the map in the top navigation?
        </h2>
        <p className={darkMode ? styles.lightText : undefined}>
          The button on the search page shows a heatmap for the taxonomy you selected. The{' '}
          <Link to="/map" className={darkMode ? styles.hyperLinkDark : undefined}>
            map in the navigation
          </Link>
          , however, shows a heatmap of all occurrences in the dataset of GBIF.
        </p>
        <h2 className={darkMode ? styles.lightText : undefined}>Does this web app save any of my data?</h2>
        <p className={darkMode ? styles.lightText : undefined}>
          We save your choice of theme locally on your computer. You can always remove said item by clearing your
          browser's cache. Alongside of that we save your last selected taxonomy. This gets cleared every time you close
          the tab this web app was opened with.
        </p>
        <Button
          className={`mb-3 ${styles.buttonStyle}`}
          variant={darkMode ? 'dark' : 'primary'}
          onClick={handleOnClick}
        >
          Start browsing!
        </Button>
      </Container>
    </main>
  );
};
