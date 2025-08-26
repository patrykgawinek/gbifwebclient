import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { SingleOccurrenceResult } from "./SingleOccurrenceResult";
import { Theme } from "src/App";
import React, { useContext } from "react";
import styles from "./SearchOccurrencesResults.module.css";
import { Occurences, Occurence } from "src/types";
import { useNavigate } from "react-router-dom";

type SearchOccurrencesResultProps = {
  country: string;
  lastSelection: number;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchOccurrencesResults: React.FC<SearchOccurrencesResultProps> = ({
  country,
  lastSelection,
  offset,
  setOffset,
}) => {
  const { darkMode } = useContext(Theme);
  const navigate = useNavigate();

  const [foundResults, setFoundResults] = useState<Occurences>({
    offset: 0,
    limit: 0,
    endOfRecords: true,
    count: 0,
    results: [],
  });
  const baseUrlApi = "https://api.gbif.org/v1";
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [lastSelection, offset, country]);

  const mapParams = [
    { name: "taxonKey", value: lastSelection },
    { name: "country", value: country },
  ]
    .filter((param) => Boolean(param.value))
    .map((param) => `${param.name}=${param.value}`)
    .join("&");
  const handleOnClick = () => navigate(`/map?${mapParams}`);
  const handleChangePage =
    (next = true) =>
    () => {
      if (next && !foundResults.endOfRecords) {
        setOffset(offset + 12);
        return;
      }
      if (offset > 0) {
        setOffset(offset - 12);
      }
    };

  return (
    <Container className="d-flex flex-column">
      {loading ? (
        <Row className="justify-content-center">
          <Spinner className="" animation="border" role="status" variant={darkMode ? "light" : "primary"}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <>
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
          <Row xs={2} md={3}>
            {foundResults &&
              foundResults.results.map((result: Occurence, index: number) => (
                <Col className="mb-3" key={index}>
                  <SingleOccurrenceResult result={result} />
                </Col>
              ))}
          </Row>
        </>
      )}

      <Row xs={12} className="align-self-center justify-content-center">
        <Col xs={2} className="d-flex justify-content-end">
          <Button
            className={`${styles.buttonHeight} ${offset === 0 ? `disabled` : undefined} ${
              darkMode ? "btn-dark" : "btn-primary"
            }`}
            onClick={handleChangePage(false)}
          >
            <img src="/assets/icons/back.png" alt="<" className={styles.backNav} />
          </Button>
        </Col>
        <Col
          xs="auto"
          md="auto"
          className={`d-flex justify-content-center align-items-center ${styles.offsetText} ${
            darkMode ? styles.lightText : undefined
          }`}
        >
          {foundResults?.count > 0 ? offset + 1 : 0} - {foundResults?.endOfRecords ? foundResults?.count : offset + 12}
        </Col>
        <Col xs={2}>
          <Button
            className={`${styles.buttonHeight} ${foundResults?.endOfRecords ? `disabled` : undefined} ${
              darkMode ? "btn-dark" : "btn-primary"
            }`}
            onClick={handleChangePage()}
          >
            <img src="/assets/icons/back.png" alt=">" className={styles.nextNav} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
