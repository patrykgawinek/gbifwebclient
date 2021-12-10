import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SearchOccurencesResult.module.css";
import SingleOccurenceResult from "./SingleOccurenceResult";

interface SearchOccurencesResultProps {
  lastSelection: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchOccurencesResults = ({
  lastSelection,
  offset,
  setOffset,
}: SearchOccurencesResultProps) => {
  const [foundResults, setFoundResults] = useState<any>();
  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrence/search`, {
        params: {
          taxonKey: lastSelection,
          offset: offset,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFoundResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastSelection, offset]);

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <h2>Found results</h2>
        </Col>
        <Col>
          <Button
            className={lastSelection === -1 ? "disabled" : ""}
            onClick={() => (window.location.href = `/map/${lastSelection}`)}
          >
            Show occurences on heatmap
          </Button>
        </Col>
      </Row>
      <Row xs={2} md={3}>
        {foundResults !== undefined
          ? foundResults.results.map((result: any) => (
              <Col className={styles.colMargin}>
                <SingleOccurenceResult result={result} />
              </Col>
            ))
          : null}
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            className={offset === 0 ? `disabled` : ``}
            onClick={() => {
              if (offset > 0) {
                setOffset(offset - 20);
              }
            }}
          >
            Previous
          </Button>
        </Col>
        <Col>
          <Button
            className={
              foundResults?.endOfRecords !== undefined && foundResults.endOfRecords
                ? `disabled`
                : ``
            }
            onClick={() => {
              if (!foundResults.endOfRecords) {
                setOffset(offset + 20);
              }
            }}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchOccurencesResults;
