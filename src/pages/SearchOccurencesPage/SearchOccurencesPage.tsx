import axios from "axios";
import { useEffect, useState } from "react";

const SearchOccurencesPage = () => {
  const baseUrlApi: string = "https://api.gbif.org/v1";
  const [kingdomList, setKingdomList] = useState<[number, string][]>([]);
  const [selectedKingdom, setSelectedKingdom] = useState<number>();

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/species/suggest`, {
        params: {
          rank: "kingdom",
        },
      })
      .then((response) => {
        console.log("fetched");
        let tempList = response.data.map((record: any) => [record.kingdomKey, record.kingdom]);
        setKingdomList(tempList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedKingdom]);

  return (
    <main>
      <h1>Search Occurences</h1>
      <section>
        <form action="get">
          <div>
            <label htmlFor="kingdom">Kingdom</label>
            <select
              name="kingdom"
              id="kingdom"
              value={selectedKingdom}
              onChange={(e) => setSelectedKingdom(parseInt(e.target.value))}
            >
              {kingdomList.map((kingdom) => (
                <option value={kingdom[0]} key={kingdom[0]}>
                  {kingdom[1]}
                </option>
              ))}
            </select>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SearchOccurencesPage;
