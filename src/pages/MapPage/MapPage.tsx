import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { Theme } from 'components/App/App';
import { useContext, useEffect, useState } from 'react';
import styles from './MapPage.module.css';
import { useSearchParams } from 'react-router-dom';

const MapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { darkMode } = useContext(Theme);
  const [mapStyle, setMapStyle] = useState<string>('');

  useEffect(() => {
    if (darkMode) {
      setMapStyle('purpleYellow.point');
    } else {
      setMapStyle('glacier.point');
    }
  }, [darkMode, mapStyle]);

  const params = [
    { name: 'style', value: mapStyle },
    { name: 'taxonKey', value: searchParams.get('taxonKey') },
    { name: 'country', value: searchParams.get('country') },
  ]
    .filter((param) => Boolean(param.value))
    .map((param) => `${param.name}=${param.value}`)
    .join('&');
  console.log(params);
  const overlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?${params}`;

  return (
    <main className={styles.container}>
      {darkMode && (
        <LeafletMap className={styles.leaflet} center={[30, 20]} zoom={3} scrollWheelZoom={true}>
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
        <LeafletMap className={styles.leaflet} center={[30, 20]} zoom={3} scrollWheelZoom={true}>
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
