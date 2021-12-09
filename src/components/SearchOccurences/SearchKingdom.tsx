import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./SearchKingdom.module.css";

interface SearchKingdomProps {
  selectedKingdom: number;
  setSelectedKingdom: Dispatch<SetStateAction<number>>;
  showItems: boolean[];
  setShowItems: Dispatch<SetStateAction<boolean[]>>;
  setLastSelection: Dispatch<SetStateAction<number>>;
}

const SearchKingdom = ({
  selectedKingdom,
  setSelectedKingdom,
  showItems,
  setShowItems,
  setLastSelection,
}: SearchKingdomProps) => {
  const [kingdomList, setKingdomList] = useState<any>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/species/suggest`, {
        params: {
          rank: "kingdom",
        },
      })
      .then((response) => {
        let tempList = response.data;
        setKingdomList(tempList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedKingdom]);

  return (
    <article className={styles.kingdoms}>
      {kingdomList.map((kingdom: any) => (
        <Button
          variant="outline-primary"
          value={kingdom.kingdomKey}
          key={kingdom.kingdomKey}
          onClick={() => {
            setSelectedKingdom(kingdom.kingdomKey);
            setLastSelection(kingdom.kingdomKey);
            setShowItems([true, true, false, false, false, false, false]);
          }}
        >
          {kingdom.scientificName}
        </Button>
      ))}
    </article>
  );
};

export default SearchKingdom;
