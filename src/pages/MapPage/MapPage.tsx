import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { useParams } from "react-router";
import { Theme } from "components/App/App";
import { useContext, useEffect, useState } from "react";
import styles from "./MapPage.module.css";

interface ParamTypes {
  id: string;
}

const MapPage = () => {
  let taxonKey = useParams<ParamTypes>();
  const { darkMode } = useContext(Theme);
  const [mapStyle, setMapStyle] = useState<string>("");

  useEffect(() => {
    if (darkMode) {
      setMapStyle("purpleYellow.point");
    } else {
      setMapStyle("glacier.point");
    }
  }, [darkMode, mapStyle]);

  let overlay: string;
  if (taxonKey.id === undefined) {
    overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}`;
  } else {
    overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}&taxonKey=${taxonKey.id}`;
  }

  return (
    <main className={styles.container}>
      {darkMode && (
        <LeafletMap
          className={styles.leaflet}
          center={[51.2213, 4.4051]}
          zoom={3}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <TileLayer
            url={overlay}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LeafletMap>
      )}
      {!darkMode && (
        <LeafletMap
          className={styles.leaflet}
          center={[51.2213, 4.4051]}
          zoom={3}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <TileLayer
            url={overlay}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </LeafletMap>
      )}
    </main>
  );
};

export default MapPage;
