import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SingleOccurrenceResult from "./SingleOccurrenceResult";
import SelectCountry from "./SelectCountry";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SearchOccurrencesResults.module.css";
import { Link } from "react-router-dom";
import { count } from "console";

interface SearchOccurrencesResultProps {
  lastSelection: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchOccurrencesResults = ({
  lastSelection,
  offset,
  setOffset,
}: SearchOccurrencesResultProps) => {
  const { darkMode } = useContext(Theme);

  const [country, setCountry] = useState<string>("");
  const [foundResults, setFoundResults] = useState<any>();
  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrence/search`, {
        params: {
          limit: 12,
          taxonKey: lastSelection,
          offset: offset,
          country: country,
        },
      })
      .then((response) => {
        setFoundResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastSelection, offset, country]);

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <h2 className={darkMode ? styles.lightText : undefined}>Found results</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to={`/map/${lastSelection}`}>
            <Button
              className={`${lastSelection === -1 ? "disabled" : ""} ${
                darkMode ? "btn-dark" : "btn-primary"
              }`}
            >
              Show occurrences on heatmap
            </Button>
          </Link>
        </Col>
      </Row>
      <SelectCountry setCountry={setCountry} />
      <Row xs={2} md={3}>
        {foundResults !== undefined
          ? foundResults.results.map((result: any, index: number) => (
              <Col className="mb-3" key={index}>
                <SingleOccurrenceResult result={result} />
              </Col>
            ))
          : null}
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            className={`${offset === 0 ? `disabled` : undefined} ${
              darkMode ? "btn-dark" : "btn-primary"
            }`}
            onClick={() => {
              if (offset > 0) {
                setOffset(offset - 12);
              }
            }}
          >
            &lt; Previous
          </Button>
        </Col>
        <Col>
          <Button
            className={`${
              foundResults?.endOfRecords !== undefined && foundResults.endOfRecords
                ? `disabled`
                : undefined
            } ${darkMode ? "btn-dark" : "btn-primary"}`}
            onClick={() => {
              if (!foundResults.endOfRecords) {
                setOffset(offset + 12);
              }
            }}
          >
            Next &gt;
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchOccurrencesResults;
