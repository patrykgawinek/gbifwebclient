import SearchClassification from "components/SearchOccurences/SearchClassification";
import SearchKingdom from "components/SearchOccurences/SearchKingdom";
import SearchOccurencesResult from "components/SearchOccurencesResult/SearchOccurencesResults";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SearchOccurencesPage.module.css";

const SearchOccurencesPage = () => {
  //Usestates to keep track of made choices by the user
  const [selectedKingdom, setSelectedKingdom] = useState<number>(-1);
  const [selectedPhylum, setSelectedPhylum] = useState<number>(-1);
  const [selectedClass, setSelectedClass] = useState<number>(-1);
  const [selectedOrder, setSelectedOrder] = useState<number>(-1);
  const [selectedFamily, setSelectedFamily] = useState<number>(-1);
  const [selectedGenus, setSelectedGenus] = useState<number>(-1);
  const [selectedSpecies, setSelectedSpecies] = useState<number>(-1);
  const classificationArray: [string, number, React.Dispatch<React.SetStateAction<number>>][] = [
    ["Kingdom", selectedKingdom, setSelectedKingdom],
    ["Phylum", selectedPhylum, setSelectedPhylum],
    ["Class", selectedClass, setSelectedClass],
    ["Order", selectedOrder, setSelectedOrder],
    ["Family", selectedFamily, setSelectedFamily],
    ["Genus", selectedGenus, setSelectedGenus],
    ["Species", selectedSpecies, setSelectedSpecies],
  ];

  //Usestate for search query on occurences based on last classification level/choice
  const [lastSelection, setLastSelection] = useState<number>(-1);

  //Usestates for short circuit evaluation to hide elements on page depending on classification level the user picked
  const [showItems, setShowItems] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //Usestate to track offset on occurence results -- raised to page level so that it can be passed to search criteria to set the offset to 0
  const [offset, setOffset] = useState<number>(0);

  //Usestate to change web app theme
  const { darkMode } = useContext(Theme);

  return (
    <main>
      <Container>
        <Row className="mb-5">
          <h1 className={darkMode ? styles.lightText : undefined}>Search Occurences</h1>
          {showItems[0] && (
            <SearchKingdom
              selectedKingdom={selectedKingdom}
              setSelectedKingdom={setSelectedKingdom}
              showItems={showItems}
              setShowItems={setShowItems}
              setLastSelection={setLastSelection}
              setOffset={setOffset}
            />
          )}
          <Row xs={1} sm={1} md={3}>
            {classificationArray.slice(1).map((classification, index) => {
              return (
                showItems[index + 1] && (
                  <Col key={index + 1}>
                    <SearchClassification
                      classificationLevel={index + 1}
                      showItems={showItems}
                      setShowItems={setShowItems}
                      currentClassification={classification[0]}
                      selectedHigherClassification={classificationArray[index][1]}
                      selectedCurrentClassification={classification[1]}
                      setSelectedCurrentClassification={classification[2]}
                      setLastSelection={setLastSelection}
                      setOffset={setOffset}
                    />
                  </Col>
                )
              );
            })}
          </Row>
        </Row>
        <Row className="mb-3">
          <SearchOccurencesResult
            lastSelection={lastSelection}
            offset={offset}
            setOffset={setOffset}
          />
        </Row>
      </Container>
    </main>
  );
};

export default SearchOccurencesPage;
