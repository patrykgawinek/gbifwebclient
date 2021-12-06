import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchOccurencesResult.module.css";

interface SearchOccurencesResultProps {
  lastSelection: number;
}

const SearchOccurencesResult = ({ lastSelection }: SearchOccurencesResultProps) => {
  const [foundResults, setFoundResults] = useState<any>();

  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrence/search`, {
        params: {
          taxonKey: lastSelection,
        },
      })
      .then((response) => {
        setFoundResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lastSelection]);

  return (
    <div>
      <h2>Found results</h2>
      {foundResults !== undefined
        ? foundResults.results.map((result: any) => (
            <Link to={`/occurences/${result.key}`}>
              <div key={result.key}>{result.key}</div>
            </Link>
          ))
        : null}
    </div>
  );
};

export default SearchOccurencesResult;
