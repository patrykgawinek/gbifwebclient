import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SearchOccurencesResult.module.css";
import SingleOccurenceResult from "./SingleOccurenceResult";

interface SearchOccurencesResultProps {
  lastSelection: number;
}

const SearchOccurencesResults = ({ lastSelection }: SearchOccurencesResultProps) => {
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
                <SingleOccurenceResult result={result} />
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default SearchOccurencesResults;
