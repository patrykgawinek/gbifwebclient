import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "leaflet";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./leaflet.css";
import styles from "./SingleOccurencePage.module.css";

interface ParamTypes {
  id: string;
}

const SingleOccurencePage = () => {
  let { id } = useParams<ParamTypes>();
  const [occurence, setOccurence] = useState<any>({ decimalLongitude: 25, decimalLatitude: 0 });

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
      <div className={styles.leaflet}>
        <LeafletMap
          center={[occurence.decimalLatitude, occurence.decimalLongitude]}
          zoom={2}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[occurence.decimalLatitude, occurence.decimalLongitude]}></Marker>
        </LeafletMap>
      </div>

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
