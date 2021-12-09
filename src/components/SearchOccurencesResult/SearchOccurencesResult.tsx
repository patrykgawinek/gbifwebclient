import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SearchOccurencesResult.module.css";

interface SearchOccurencesResultProps {
  lastSelection: number;
}

const SearchOccurencesResult = ({ lastSelection }: SearchOccurencesResultProps) => {
  const [foundResults, setFoundResults] = useState<any>();

  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrence/search`, {
        params: {
          taxonKey: lastSelection,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFoundResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastSelection]);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Found results</h2>
        </Col>
        <Col>
          <Button onClick={() => (window.location.href = `/map/${lastSelection}`)}>
            Show occurences on heatmap
          </Button>
        </Col>
      </Row>
      <Row>
        {foundResults !== undefined
          ? foundResults.results.map((result: any) => (
              <Col className={styles.colMargin}>
                <Link to={`/occurences/${result.key}`} className={styles.cardLink}>
                  <Card>
                    {result.media[0]?.identifier !== undefined && (
                      <Card.Img
                        className={styles.cardImage}
                        variant="top"
                        src={result.media[0]?.identifier}
                      />
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
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default SearchOccurencesResult;
