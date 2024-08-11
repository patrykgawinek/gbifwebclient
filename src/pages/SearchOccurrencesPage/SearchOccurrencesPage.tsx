import { SearchClassification, SearchKingdom, SearchOccurrencesResults, SelectCountry } from "src/components";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Theme } from "src/App";
import { useContext } from "react";
import styles from "./SearchOccurrencesPage.module.css";
import { ClassificationState } from "src/types";

export const SearchOccurrencesPage: React.FC = () => {
  //Usestates to keep track of made choices by the user
  const [selectedKingdom, setSelectedKingdom] = useState<number>(-1);
  const [selectedPhylum, setSelectedPhylum] = useState<number>(-1);
  const [selectedClass, setSelectedClass] = useState<number>(-1);
  const [selectedOrder, setSelectedOrder] = useState<number>(-1);
  const [selectedFamily, setSelectedFamily] = useState<number>(-1);
  const [selectedGenus, setSelectedGenus] = useState<number>(-1);
  const [selectedSpecies, setSelectedSpecies] = useState<number>(-1);
  const classificationArray: ClassificationState[] = [
    { name: "Kingdom", value: selectedKingdom, setValue: setSelectedKingdom },
    { name: "Phylum", value: selectedPhylum, setValue: setSelectedPhylum },
    { name: "Class", value: selectedClass, setValue: setSelectedClass },
    { name: "Order", value: selectedOrder, setValue: setSelectedOrder },
    { name: "Family", value: selectedFamily, setValue: setSelectedFamily },
    { name: "Genus", value: selectedGenus, setValue: setSelectedGenus },
    { name: "Species", value: selectedSpecies, setValue: setSelectedSpecies },
  ];

  //Usestate for search query on occurrences based on last classification level/choice
  const [lastSelection, setLastSelection] = useState<number>(-1);

  //Usestates for short circuit evaluation to hide elements on page depending on classification level the user picked
  const [showItems, setShowItems] = useState<boolean[]>([true, false, false, false, false, false, false]);

  //Usestate to track offset on occurrence results -- raised to page level so that it can be passed to search criteria to set the offset to 0
  const [offset, setOffset] = useState<number>(0);

  //Usestate to change web app theme
  const { darkMode } = useContext(Theme);

  //Usestate to track selected country
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    const data = sessionStorage.getItem("lastSelection");
    if (data) {
      setLastSelection(JSON.parse(data));
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("lastSelection", JSON.stringify(lastSelection));
  }, [lastSelection]);

  return (
    <main>
      <Container>
        <Row className="mb-5">
          <h1 className={`mt-3 ${darkMode ? styles.lightText : undefined}`}>Search Occurrences</h1>
          {showItems[0] && (
            <SearchKingdom
              setSelectedKingdom={setSelectedKingdom}
              setShowItems={setShowItems}
              setLastSelection={setLastSelection}
              setOffset={setOffset}
            />
          )}
          <Row xs={1} sm={1} md={3}>
            {classificationArray.slice(1).map((classification, index) => {
              return (
                showItems[index + 1] && (
                  <Col key={classification.name}>
                    <SearchClassification
                      classificationLevel={index + 1}
                      showItems={showItems}
                      setShowItems={setShowItems}
                      classificationArray={classificationArray}
                      setLastSelection={setLastSelection}
                      setOffset={setOffset}
                    />
                  </Col>
                )
              );
            })}
          </Row>
        </Row>
        <SelectCountry country={country} setCountry={setCountry} setOffset={setOffset} />
        <Row className="mb-3">
          <SearchOccurrencesResults
            country={country}
            lastSelection={lastSelection}
            offset={offset}
            setOffset={setOffset}
          />
        </Row>
      </Container>
    </main>
  );
};
