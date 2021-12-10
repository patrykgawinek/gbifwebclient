import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useParams } from "react-router";
import "./leaflet.css";
import styles from "./MapPage.module.css";

interface ParamTypes {
  id: string;
}

const MapPage = () => {
  let taxonKey = useParams<ParamTypes>();

  let url: string;
  let mapStyle = "glacier";
  //let mapStyle = "purpleHeat";
  if (taxonKey.id === undefined) {
    url = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}.point`;
  } else {
    url = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}.point&taxonKey=${taxonKey.id}`;
  }

  return (
    <div className={styles.container}>
      <LeafletMap center={[51.2213, 4.4051]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url={url}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  );
};

export default MapPage;
