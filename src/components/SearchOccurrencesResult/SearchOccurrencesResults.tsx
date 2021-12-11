import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SingleOccurrenceResult from "./SingleOccurrenceResult";
import SelectCountry from "./SelectCountry";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SearchOccurrencesResults.module.css";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

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

  const handleOnClick = useCallback(
    () => history.push(`/map/${lastSelection}`),
    [history, lastSelection]
  );

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <h2 className={darkMode ? styles.lightText : undefined}>
            Found {foundResults?.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} results
          </h2>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button
            onClick={handleOnClick}
            className={`${styles.heatmapButton} ${lastSelection === -1 ? "disabled" : ""} ${
              darkMode ? "btn-dark" : "btn-primary"
            }`}
          >
            Show occurrences on heatmap
          </Button>
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
      <Row xs={3}>
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
            &lt; Back
          </Button>
        </Col>
        <Col
          md="auto"
          className={`d-flex justify-content-center align-items-center ${styles.offsetText} ${
            darkMode ? styles.lightText : undefined
          }`}
        >
          {foundResults?.count > 0 ? offset + 1 : 0} -{" "}
          {foundResults?.endOfRecords ? foundResults?.count : offset + 12}
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
