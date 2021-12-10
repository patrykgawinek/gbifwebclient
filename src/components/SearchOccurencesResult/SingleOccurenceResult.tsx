import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./SingleOccurenceResult.module.css";

interface SingleOccurenceResultProps {
  result: any;
}

const SingleOccurenceResult = ({ result }: SingleOccurenceResultProps) => {
  return (
    <Link to={`/occurences/${result.key}`} className={styles.cardLink}>
      <Card>
        {result.media[0]?.identifier !== undefined && (
          <Card.Img className={styles.cardImage} variant="top" src={result.media[0]?.identifier} />
        )}
        <Card.Body>
          <Card.Title>
            {result.species !== undefined
              ? `${result.species}`
              : result.genus !== undefined
              ? `${result.genus}`
              : result.family !== undefined
              ? `${result.family}`
              : result.order !== undefined
              ? `${result.order}`
              : result.phylum !== undefined
              ? `${result.phylum}`
              : result.kingdom !== undefined
              ? `${result.kingdom}`
              : `Unidentified`}
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SingleOccurenceResult;
