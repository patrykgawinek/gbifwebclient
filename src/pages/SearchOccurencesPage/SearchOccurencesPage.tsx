import SearchKingdom from "components/SearchOccurences/SearchKingdom";
import SearchPhylum from "components/SearchOccurences/SearchPhylum";
import { useState } from "react";
import styles from "./SearchOccurencesPage.module.css";

const SearchOccurencesPage = () => {
  const [selectedKingdom, setSelectedKingdom] = useState<number>(-1);
  const [selectedPhylum, setSelectedPhylum] = useState<number>(-1);

  return (
    <main>
      <h1 className={styles.h1}>Search Occurences</h1>
      <section>
        <SearchKingdom selectedKingdom={selectedKingdom} setSelectedKingdom={setSelectedKingdom} />
        <SearchPhylum
          selectedKingdom={selectedKingdom}
          selectedPhylum={selectedPhylum}
          setSelectedPhylum={setSelectedPhylum}
        />
      </section>
      <section></section>
    </main>
  );
};

export default SearchOccurencesPage;
