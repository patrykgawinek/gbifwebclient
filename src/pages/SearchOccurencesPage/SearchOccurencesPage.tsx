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
        {showItems[1] ? (
          <SearchClassification
            currentClassification={"Phylum"}
            selectedHigherClassification={selectedKingdom}
            selectedCurrentClassification={selectedPhylum}
            setSelectedCurrentClassification={setSelectedPhylum}
          />
        ) : null}
        {showItems[2] ? (
          <SearchClassification
            currentClassification={"Class"}
            selectedHigherClassification={selectedPhylum}
            selectedCurrentClassification={selectedClass}
            setSelectedCurrentClassification={setSelectedClass}
          />
        ) : null}
        {showItems[3] ? (
          <SearchClassification
            currentClassification={"Order"}
            selectedHigherClassification={selectedClass}
            selectedCurrentClassification={selectedOrder}
            setSelectedCurrentClassification={setSelectedOrder}
          />
        ) : null}
        {showItems[4] ? (
          <SearchClassification
            currentClassification={"Family"}
            selectedHigherClassification={selectedOrder}
            selectedCurrentClassification={selectedFamily}
            setSelectedCurrentClassification={setSelectedFamily}
          />
        ) : null}
        {showItems[5] ? (
          <SearchClassification
            currentClassification={"Genus"}
            selectedHigherClassification={selectedFamily}
            selectedCurrentClassification={selectedGenus}
            setSelectedCurrentClassification={setSelectedGenus}
          />
        ) : null}
        {showItems[6] ? (
          <SearchClassification
            currentClassification={"Species"}
            selectedHigherClassification={selectedGenus}
            selectedCurrentClassification={selectedSpecies}
            setSelectedCurrentClassification={setSelectedSpecies}
          />
        ) : null}
      </section>
      <section></section>
    </main>
  );
};

export default SearchOccurencesPage;
