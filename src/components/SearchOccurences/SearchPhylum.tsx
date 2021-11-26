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
  const [phylumList, setPhylumList] = useState<any>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    let offset = 0;
    let tempArray: any = [];
    const fetchPhylum = () => {
      axios
        .get(`${baseUrlApi}/species/${selectedKingdom[0]}/children`, {
          params: {
            limit: 20,
            offset: offset,
          },
        })
        .then((response) => {
          tempArray.push(...response.data.results);
          if (!response.data.endOfRecords && tempArray[tempArray.length - 1].phylum !== undefined) {
            offset += 20;
            fetchPhylum();
          } else {
            setPhylumList(tempArray);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPhylum();
  }, [selectedKingdom]);
  let filteredPhylum = phylumList.filter((item: any) => item.phylum !== undefined);

  return (
    <article>
      <label htmlFor="phylum">Phylum</label>
      <select name="phylum" id="phylum">
        {filteredPhylum.map((record: any) => (
          <option key={record.phylumKey}>{record.phylum}</option>
        ))}
      </select>
    </article>
  );
};

export default SearchPhylum;
