import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Theme } from 'components/App/App';
import { useContext } from 'react';
import styles from './SingleOccurrenceResult.module.css';
import { Occurence } from 'types';

type SingleOccurrenceResultProps = {
  result: Occurence;
};

const SingleOccurrenceResult: React.FC<SingleOccurrenceResultProps> = ({ result }) => {
  const { darkMode } = useContext(Theme);

  return (
    <Link to={`/occurrences/${result.key}`} className={styles.cardLink}>
      <Card className={`${styles.cardAnimation} ${darkMode ? 'bg-dark text-white' : undefined}`}>
        <Card.Img
          className={styles.cardImage}
          variant="top"
          src={
            result.media[0]?.type !== 'Sound' && result.media[0]?.identifier
              ? result.media[0]?.identifier
              : darkMode
              ? `assets/images/noImageFoundDark.png`
              : `assets/images/noImageFound.png`
          }
        />
        <Card.Body>
          <Card.Title>
            {result.species ??
              result.genus ??
              result.family ??
              result.order ??
              result.phylum ??
              result.kingdom ??
              'Unidentified'}
          </Card.Title>
          <Card.Text>
            {result.gadm.level0?.name ?? `No level 0 GADM provided`}
            ,<br />
            {result.gadm.level1?.name ?? `No level 1 GADM provided`}
            ,<br />
            {result.gadm.level2?.name ?? `No level 2 GADM provided`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SingleOccurrenceResult;
