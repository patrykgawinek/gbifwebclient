import styles from "./SearchOccurencesResult.module.css";

interface SearchOccurencesResultProps {
  showItems: boolean[];
  classificationArray: [string, number, React.Dispatch<React.SetStateAction<number>>][];
}

const SearchOccurencesResult = ({
  showItems,
  classificationArray,
}: SearchOccurencesResultProps) => {
  return (
    <>
      {classificationArray.map((classification, index) => (
        <div key={index}>
          <div>{classification[1]}</div>
        </div>
      ))}
    </>
  );
};

export default SearchOccurencesResult;
