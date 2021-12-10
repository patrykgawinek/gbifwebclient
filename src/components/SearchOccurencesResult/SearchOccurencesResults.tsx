import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
          limit: 12,
          taxonKey: lastSelection,
          offset: offset,
        },
      })
      .then((response) => {
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
        <Col className="d-flex justify-content-end">
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
          ? foundResults.results.map((result: any, index: number) => (
              <Col className={styles.colMargin} key={index}>
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
                setOffset(offset - 12);
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
                setOffset(offset + 12);
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
