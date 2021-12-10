import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SearchClassification.module.css";

interface SearchClassProps {
  showItems: boolean[];
  setShowItems: React.Dispatch<React.SetStateAction<boolean[]>>;
  classificationLevel: number;
  currentClassification: string;
  selectedHigherClassification: number;
  selectedCurrentClassification: number;
  setSelectedCurrentClassification: React.Dispatch<React.SetStateAction<number>>;
  setLastSelection: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchClassification = ({
  showItems,
  setShowItems,
  classificationLevel,
  currentClassification,
  selectedHigherClassification,
  selectedCurrentClassification,
  setSelectedCurrentClassification,
  setLastSelection,
  setOffset,
}: SearchClassProps) => {
  const { darkMode } = useContext(Theme);

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
  }, [selectedHigherClassification, currentClassification]);
  let filteredTaxon: any[] = currentList.filter(
    (item: any) => item.rank === currentClassification.toUpperCase()
  );

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> | undefined = (event) => {
    setSelectedCurrentClassification(parseInt(event.target.value));
    setLastSelection(parseInt(event.target.value));
    setOffset(0); //Sets offset for search occurence results back to 0

    let tempShowArray: boolean[] = [];
    for (let i = 0; i < classificationLevel + 2; i++) {
      tempShowArray.push(true);
    }
    for (let i = classificationLevel; i < showItems.length; i++) {
      tempShowArray.push(false);
    }
    setShowItems(tempShowArray);
  };

  if (filteredTaxon.length <= 0) {
    return (
      <div className={styles.noTaxonFoundContainer}>
        <p
          className={`${styles.noTaxonFound} ${darkMode ? styles.lightText : undefined}`}
        >{`No ${currentClassification.toLowerCase()} found in this classification.`}</p>
      </div>
    );
  }
  return (
    <article className={styles.classification}>
      <label className={styles.lightText} htmlFor={currentClassification}>
        {currentClassification}
      </label>
      <Form.Select
        className={darkMode ? styles.formDark : undefined}
        name={currentClassification}
        id={currentClassification}
        value={selectedCurrentClassification}
        onChange={handleOnChange}
      >
        <option key={-1} value={-1} hidden>
          -- Pick one of the options below --
        </option>
        {filteredTaxon.map((record: any) => (
          <option key={record.key} value={record.key}>
            {record.scientificName}
          </option>
        ))}
      </Form.Select>
    </article>
  );
};

export default SearchClassification;
