import SearchClassification from "components/SearchOccurences/SearchClassification";
import SearchKingdom from "components/SearchOccurences/SearchKingdom";
import SearchOccurencesResult from "components/SearchOccurencesResult/SearchOccurencesResult";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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

  return (
    <main>
      <Container>
        <Row className={styles.row}>
          <h1>Search Occurences</h1>
          {showItems[0] && (
            <SearchKingdom
              selectedKingdom={selectedKingdom}
              setSelectedKingdom={setSelectedKingdom}
              showItems={showItems}
              setShowItems={setShowItems}
              setLastSelection={setLastSelection}
            />
          )}
          <Row>
            {classificationArray.slice(1, 4).map((classification, index) => {
              return (
                showItems[index + 1] && (
                  <Col>
                    <SearchClassification
                      key={index + 1}
                      classificationLevel={index + 1}
                      showItems={showItems}
                      setShowItems={setShowItems}
                      currentClassification={classification[0]}
                      selectedHigherClassification={classificationArray[index][1]}
                      selectedCurrentClassification={classification[1]}
                      setSelectedCurrentClassification={classification[2]}
                      setLastSelection={setLastSelection}
                    />
                  </Col>
                )
              );
            })}
          </Row>
          <Row>
            {classificationArray.slice(4).map((classification, index) => {
              return (
                showItems[index + 4] && (
                  <Col>
                    <SearchClassification
                      key={index + 4}
                      classificationLevel={index + 4}
                      showItems={showItems}
                      setShowItems={setShowItems}
                      currentClassification={classification[0]}
                      selectedHigherClassification={classificationArray[index + 3][1]}
                      selectedCurrentClassification={classification[1]}
                      setSelectedCurrentClassification={classification[2]}
                      setLastSelection={setLastSelection}
                    />
                  </Col>
                )
              );
            })}
          </Row>
        </Row>
        <Row>
          <SearchOccurencesResult lastSelection={lastSelection} />
        </Row>
      </Container>
    </main>
  );
};

export default SearchOccurencesPage;
