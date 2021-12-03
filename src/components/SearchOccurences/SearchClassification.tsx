import axios from "axios";
import { useEffect, useState } from "react";

interface SearchClassProps {
  currentClassification: string;
  selectedHigherClassification: number;
  selectedCurrentClassification: number;
  setSelectedCurrentClassification: React.Dispatch<React.SetStateAction<number>>;
}

const SearchClassification = ({
  currentClassification,
  selectedHigherClassification,
  selectedCurrentClassification,
  setSelectedCurrentClassification,
}: SearchClassProps) => {
  const [currentList, setCurrentList] = useState<any>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    let offset = 0;
    let tempArray: any = [];
    const fetchTaxon = () => {
      axios
        .get(`${baseUrlApi}/species/${selectedHigherClassification}/children`, {
          params: {
            limit: 20,
            offset: offset,
          },
        })
        .then((response) => {
          tempArray.push(...response.data.results);
          if (
            !response.data.endOfRecords &&
            tempArray[tempArray.length - 1].rank === currentClassification.toUpperCase()
          ) {
            offset += 20;
            fetchTaxon();
          } else {
            setCurrentList(tempArray);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchTaxon();
  }, [selectedHigherClassification]);
  let filteredTaxon = currentList.filter(
    (item: any) => item.rank === currentClassification.toUpperCase()
  );

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> | undefined = (event) => {
    setSelectedCurrentClassification(parseInt(event.target.value));
  };

  return (
    <article>
      <label htmlFor={currentClassification}>{currentClassification}</label>
      <select
        name={currentClassification}
        id={currentClassification}
        value={selectedCurrentClassification}
        onChange={handleOnChange}
      >
        {filteredTaxon.map((record: any) => (
          <option key={record.key} value={record.key}>
            {record.scientificName}
          </option>
        ))}
      </select>
    </article>
  );
};

export default SearchClassification;
