import SearchClassification from "components/SearchOccurences/SearchClassification";
import SearchKingdom from "components/SearchOccurences/SearchKingdom";
import { useState } from "react";
import styles from "./SearchOccurencesPage.module.css";

const SearchOccurencesPage = () => {
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
    ["Class", selectedFamily, setSelectedFamily],
    ["Family", selectedGenus, setSelectedGenus],
    ["Genus", selectedSpecies, setSelectedSpecies],
  ];

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
      <h1 className={styles.h1}>Search Occurences</h1>
      <section>
        {showItems[0] ? (
          <SearchKingdom
            selectedKingdom={selectedKingdom}
            setSelectedKingdom={setSelectedKingdom}
            showItems={showItems}
            setShowItems={setShowItems}
          />
        ) : null}
        {classificationArray.slice(1).map((classification, index) => {
          return showItems[index + 1] ? (
            <SearchClassification
              classificationLevel={index + 1}
              showItems={showItems}
              setShowItems={setShowItems}
              currentClassification={classification[0]}
              selectedHigherClassification={classificationArray[index][1]}
              selectedCurrentClassification={classification[1]}
              setSelectedCurrentClassification={classification[2]}
            />
          ) : null;
        })}
      </section>
      <section></section>
    </main>
  );
};

export default SearchOccurencesPage;
