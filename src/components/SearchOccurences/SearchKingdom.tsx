import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./SearchKingdom.module.css";

interface SearchKingdomProps {
  selectedKingdom: [number, string];
  setSelectedKingdom: Dispatch<SetStateAction<[number, string]>>;
}

const SearchKingdom = ({ selectedKingdom, setSelectedKingdom }: SearchKingdomProps) => {
  const [kingdomList, setKingdomList] = useState<[number, string][]>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/species/suggest`, {
        params: {
          rank: "kingdom",
        },
      })
      .then((response) => {
        let tempList = response.data.map((record: any) => [record.kingdomKey, record.kingdom]);
        setKingdomList(tempList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedKingdom]);

  return (
    <article className={styles.kingdoms}>
      {kingdomList.map((kingdom) => (
        <button
          value={kingdom[0]}
          key={kingdom[0]}
          onClick={() => setSelectedKingdom([kingdom[0], kingdom[1]])}
        >
          {kingdom[1]}
        </button>
      ))}
    </article>
  );
};

export default SearchKingdom;
