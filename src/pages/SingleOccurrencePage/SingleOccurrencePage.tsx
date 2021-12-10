import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "./leaflet.css";
import styles from "./SingleOccurrencePage.module.css";
import { Col, Container, Row, Image, Carousel, Table } from "react-bootstrap";
import { Theme } from "components/App/App";

interface ParamTypes {
  id: string;
}

const SingleOccurrencePage = () => {
  let { id } = useParams<ParamTypes>();
  const { darkMode } = useContext(Theme);
  const [occurrence, setOccurrence] = useState<any>();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelect = (selectedIndex: number, e: any) => {
    setCarouselIndex(selectedIndex);
  };

  const baseUrlApi: string = "https://api.gbif.org/v1";
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/occurrrence/${id}`)
      .then((response) => {
        setOccurrence(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <main className={darkMode ? styles.light : undefined}>
      <Container className={styles.tableBorderOverwrite}>
        <h1 className="mt-3">Occurrence #{occurrence?.key}</h1>
        <Table className={`mt-3 ${darkMode ? "table-dark" : undefined}`} striped hover size="sm">
          <tbody>
            <tr>
              <td className="col-6">Date of occurrence</td>
              <td className="col-6">{new Date(occurrence?.eventDate).toUTCString()}</td>
            </tr>
            <tr>
              <td>Identified by</td>
              <td>
                {occurrence?.identifiedBy !== undefined ? occurrence?.identifiedBy : "Unknown"}
              </td>
            </tr>
            <tr>
              <td>Occurrence remarks</td>
              <td>{occurrence?.occurrrenceRemarks}</td>
            </tr>
          </tbody>
        </Table>
        <Row>
          {occurrence?.decimalLatitude !== undefined ? (
            <Col
              className={occurrence?.media.length > 0 ? "col-12 col-sm-12 col-md-6" : "col-sm-12"}
            >
              <div className={styles.leaflet}>
                <LeafletMap
                  center={[occurrence.decimalLatitude, occurrence.decimalLongitude]}
                  zoom={4}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[occurrence.decimalLatitude, occurrence.decimalLongitude]}
                  ></Marker>
                </LeafletMap>
              </div>
            </Col>
          ) : null}
          {occurrence?.media.length > 1 ? (
            <Col className="col-12 col-sm-12 col-md-6">
              <Carousel fade activeIndex={carouselIndex} onSelect={handleSelect}>
                {occurrence.media.map((e: any, index: number) => (
                  <Carousel.Item key={index}>
                    <Image src={e.identifier} className={styles.resizeImage} rounded />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          ) : occurrence?.media.length > 0 ? (
            <Col className="col-12 col-sm-12 col-md-6">
              <Image src={occurrence.media[0].identifier} className={styles.resizeImage} rounded />
            </Col>
          ) : null}
        </Row>
        <Table className={`mt-3 ${darkMode ? "table-dark" : undefined}`} striped hover size="sm">
          <thead>
            <tr>
              <th className="col-6">Taxon</th>
              <th className="col-6">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kingdom</td>
              <td>{occurrence?.kingdom}</td>
            </tr>
            <tr>
              <td>Phylum</td>
              <td>{occurrence?.phylum}</td>
            </tr>
            <tr>
              <td>Order</td>
              <td>{occurrence?.order}</td>
            </tr>
            <tr>
              <td>Family</td>
              <td>{occurrence?.family}</td>
            </tr>
            <tr>
              <td>Genus</td>
              <td>{occurrence?.genus}</td>
            </tr>
            <tr>
              <td>Species</td>
              <td>{occurrence?.species}</td>
            </tr>
          </tbody>
        </Table>
        <Table className={`${darkMode ? "table-dark" : undefined}`} striped hover size="sm">
          <thead>
            <tr>
              <td className="col-6">Naming</td>
              <td className="col-6">Name</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scientific name</td>
              <td>{occurrence?.scientificName}</td>
            </tr>
            <tr>
              <td>Generic name</td>
              <td>{occurrence?.genericName}</td>
            </tr>
          </tbody>
        </Table>
        <Table className={`${darkMode ? "table-dark" : undefined}`} striped hover size="sm">
          <thead>
            <tr>
              <td className="col-6">GADM Level</td>
              <td className="col-6">Location</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GADM 0</td>
              <td>{occurrence?.gadm.level0 !== undefined && occurrence?.gadm.level0.name}</td>
            </tr>
            <tr>
              <td>GADM 1</td>
              <td>{occurrence?.gadm.level1 !== undefined && occurrence?.gadm.level1.name}</td>
            </tr>
            <tr>
              <td>GADM 2</td>
              <td>{occurrence?.gadm.level2 !== undefined && occurrence?.gadm.level2.name}</td>
            </tr>
          </tbody>
        </Table>
        <Table className={`${darkMode ? "table-dark" : undefined}`} striped size="sm">
          <thead>
            <tr>
              <td className="col-4">Latitide</td>
              <td className="col-4">Longitude</td>
              <td className="col-4">Elevation</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{occurrence?.decimalLatitude}</td>
              <td>{occurrence?.decimalLongitude}</td>
              <td>{occurrence?.elevation}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default SingleOccurrencePage;