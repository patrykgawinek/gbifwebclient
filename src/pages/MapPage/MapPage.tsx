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
  const [baseMap, setBaseMap] = useState<string>("");
  const [mapStyle, setMapStyle] = useState<string>("");

  let overlay: string;
  if (taxonKey.id === undefined) {
    overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}`;
  } else {
    overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=${mapStyle}&taxonKey=${taxonKey.id}`;
  }

  useEffect(() => {
    if (darkMode) {
      setBaseMap("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png");
      setMapStyle("purpleYellow.point");
    } else {
      setBaseMap("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
      setMapStyle("glacier.point");
    }
    console.log("theme changed");
  }, [darkMode]);

  return (
    <main className={styles.container}>
      <LeafletMap
        className={styles.leaflet}
        center={[51.2213, 4.4051]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          url={baseMap}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url={overlay}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </main>
  );
};

export default MapPage;
