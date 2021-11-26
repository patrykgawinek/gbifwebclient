import axios from "axios";
import { useEffect, useState } from "react";

interface SearchPhylumProps {
  selectedKingdom: [number, string];
  selectedPhylum: string;
  setSelectedPhylum: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPhylum = ({
  selectedKingdom,
  selectedPhylum,
  setSelectedPhylum,
}: SearchPhylumProps) => {
  const [userInput, setUserInput] = useState<string>("");
  const [phylumList, setPhylumList] = useState<any>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    let offset = 0;
    axios
      .get(`${baseUrlApi}/species/${selectedKingdom[0]}/children`, {
        params: {
          limit: 20,
          offset: offset,
        },
      })
      .then((response) => {
        let tempArray = response.data.results;
        setPhylumList(tempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInput]);

  return (
    <article>
      <label htmlFor="phylum">Phylum</label>
      <select name="phylum" id="phylum">
        {phylumList.map((record: any) =>
          record.phylum != undefined ? <option>{record.phylum}</option> : null
        )}
      </select>
    </article>
  );
};

export default SearchPhylum;
