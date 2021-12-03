import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./SearchKingdom.module.css";

interface SearchKingdomProps {
  selectedKingdom: number;
  setSelectedKingdom: Dispatch<SetStateAction<number>>;
}

const SearchKingdom = ({ selectedKingdom, setSelectedKingdom }: SearchKingdomProps) => {
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
        <button
          value={kingdom.kingdomKey}
          key={kingdom.kingdomKey}
          onClick={() => setSelectedKingdom(kingdom.kingdomKey)}
        >
          {kingdom.scientificName}
        </button>
      ))}
    </article>
  );
};

export default SearchKingdom;
