import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

const SingleOccurencePage = () => {
  let { id } = useParams<ParamTypes>();
  const [occurence, setOccurence] = useState<any>("");

  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrence/${id}`)
      .then((response) => {
        setOccurence(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {occurence.species !== undefined ? (
        <p>Species: {occurence.species}</p>
      ) : occurence.genus !== undefined ? (
        <p>Genus: {occurence.genus}</p>
      ) : occurence.family !== undefined ? (
        <p>Family: {occurence.family}</p>
      ) : occurence.order !== undefined ? (
        <p>Order: {occurence.order}</p>
      ) : occurence.phylum !== undefined ? (
        <p>Phylum: {occurence.phylum}</p>
      ) : occurence.kingdom !== undefined ? (
        <p>Kingdom: {occurence.kingdom}</p>
      ) : null}
      <p>
        Location: {occurence.continent}, {occurence.stateProvince}
      </p>
      <p>
        Coordinates: {occurence.decimalLongitude}, {occurence.decimalLatitude},{" "}
        {occurence.elevation}
      </p>
      <p>
        Date of occurence: {occurence.year}-{occurence.month}-{occurence.day}
      </p>
    </div>
  );
};

export default SingleOccurencePage;
