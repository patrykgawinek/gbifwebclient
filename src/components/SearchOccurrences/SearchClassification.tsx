import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext } from "react";
import styles from "./SearchClassification.module.css";
import { Classification } from "types";

interface SearchClassProps {
  showItems: boolean[];
  setShowItems: React.Dispatch<React.SetStateAction<boolean[]>>;
  classificationLevel: number;
  classificationArray: Classification[];
  setLastSelection: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchClassification = ({
  showItems,
  setShowItems,
  classificationLevel,
  classificationArray,
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
        .get(
          `${baseUrlApi}/species/${classificationArray[classificationLevel - 1].value}/children`,
          {
            params: {
              limit: 20,
              offset: offset,
            },
          }
        )
        .then((response) => {
          tempArray.push(...response.data.results);
          if (
            !response.data.endOfRecords &&
            tempArray[tempArray.length - 1].rank ===
              classificationArray[classificationLevel].name.toUpperCase()
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
  }, [classificationArray, classificationLevel]);
  let filteredTaxon: any[] = currentList.filter(
    (item: any) => item.rank === classificationArray[classificationLevel].name.toUpperCase()
  );

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> | undefined = (event) => {
    classificationArray[classificationLevel].setValue(parseInt(event.target.value));
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
        >{`No ${classificationArray[
          classificationLevel
        ].name.toLowerCase()} found in this classification.`}</p>
      </div>
    );
  }
  return (
    <article className={styles.classification}>
      <label className={styles.lightText} htmlFor={classificationArray[classificationLevel].name}>
        {classificationArray[classificationLevel].name}
      </label>
      <Form.Select
        className={darkMode ? styles.formDark : undefined}
        name={classificationArray[classificationLevel].name}
        id={classificationArray[classificationLevel].name}
        value={classificationArray[classificationLevel].value}
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
