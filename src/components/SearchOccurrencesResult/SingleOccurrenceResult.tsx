import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SingleOccurrenceResult.module.css";

interface SingleOccurrenceResultProps {
  result: any;
}

const SingleOccurrenceResult = ({ result }: SingleOccurrenceResultProps) => {
  const { darkMode } = useContext(Theme);

  return (
    <Link to={`/occurrences/${result.key}`} className={styles.cardLink}>
      <Card className={darkMode ? "bg-dark text-white" : undefined}>
        {result.media[0]?.identifier !== undefined && (
          <Card.Img className={styles.cardImage} variant="top" src={result.media[0]?.identifier} />
        )}
        <Card.Body>
          <Card.Title>
            {result.species !== undefined
              ? result.species
              : result.genus !== undefined
              ? result.genus
              : result.family !== undefined
              ? result.family
              : result.order !== undefined
              ? result.order
              : result.phylum !== undefined
              ? result.phylum
              : result.kingdom !== undefined
              ? result.kingdom
              : `Unidentified`}
          </Card.Title>
          <Card.Text>
            {result.gadm.level0 !== undefined
              ? result.gadm.level0.name
              : `No level 0 GADM provided`}
            ,<br />
            {result.gadm.level1 !== undefined
              ? result.gadm.level1.name
              : `No level 1 GADM provided`}
            ,<br />
            {result.gadm.level2 !== undefined
              ? result.gadm.level2.name
              : `No level 2 GADM provided`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SingleOccurrenceResult;
