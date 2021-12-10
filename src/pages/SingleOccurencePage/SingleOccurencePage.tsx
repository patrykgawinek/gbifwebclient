import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer as LeafletMap, TileLayer, Marker } from "react-leaflet";
import "./leaflet.css";
import styles from "./SingleOccurencePage.module.css";
import { Col, Container, Row, Image, Carousel, Table } from "react-bootstrap";

interface ParamTypes {
  id: string;
}

const SingleOccurencePage = () => {
  let { id } = useParams<ParamTypes>();
  const [occurence, setOccurence] = useState<any>();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelect = (selectedIndex: number, e: any) => {
    setCarouselIndex(selectedIndex);
  };

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
  }, [id]);

  return (
    <Container>
      <h1>Occurence #{occurence?.key}</h1>
      <Table className={`mt-3 ${styles.stripeColour}`} striped bordered size="sm">
        <tbody>
          <tr>
            <td>Date of occurence</td>
            <td>{new Date(occurence?.eventDate).toUTCString()}</td>
          </tr>
          <tr>
            <td>Identified by</td>
            <td>
              {occurence?.identifiedBy !== undefined ? `${occurence?.identifiedBy}` : "Unknown"}
            </td>
          </tr>
          <tr>
            <td>Occurence remarks</td>
            <td>{occurence?.occurrenceRemarks}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        {occurence?.decimalLatitude !== undefined ? (
          <Col className={occurence?.media.length > 0 ? "col-12 col-sm-12 col-md-6" : "col-sm-12"}>
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
          </Col>
        ) : null}
        {occurence?.media.length > 1 ? (
          <Col className="col-12 col-sm-12 col-md-6">
            <Carousel fade activeIndex={carouselIndex} onSelect={handleSelect}>
              {occurence.media.map((e: any, index: number) => (
                <Carousel.Item key={index}>
                  <Image src={e.identifier} thumbnail />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        ) : occurence?.media.length > 0 ? (
          <Col className="col-12 col-sm-12 col-md-6">
            <Image src={occurence.media[0].identifier} thumbnail />
          </Col>
        ) : null}
      </Row>

      <Table className={`mt-3 ${styles.stripeColour}`} striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Taxon</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kingdom</td>
            <td>{occurence?.kingdom}</td>
          </tr>
          <tr>
            <td>Phylum</td>
            <td>{occurence?.phylum}</td>
          </tr>
          <tr>
            <td>Order</td>
            <td>{occurence?.order}</td>
          </tr>
          <tr>
            <td>Family</td>
            <td>{occurence?.family}</td>
          </tr>
          <tr>
            <td>Genus</td>
            <td>{occurence?.genus}</td>
          </tr>
          <tr>
            <td>Species</td>
            <td>{occurence?.species}</td>
          </tr>
        </tbody>
      </Table>
      <Table className={styles.stripeColour} striped bordered hover size="sm">
        <thead>
          <tr>
            <td>Naming</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scientific name</td>
            <td>{occurence?.scientificName}</td>
          </tr>
          <tr>
            <td>Generic name</td>
            <td>{occurence?.genericName}</td>
          </tr>
        </tbody>
      </Table>
      <Table className={styles.stripeColour} striped bordered hover size="sm">
        <thead>
          <tr>
            <td>GADM Level</td>
            <td>Location</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GADM 0</td>
            <td>{occurence?.gadm.level0.name}</td>
          </tr>
          <tr>
            <td>GADM 1</td>
            <td>{occurence?.gadm.level1.name}</td>
          </tr>
          <tr>
            <td>GADM 2</td>
            <td>{occurence?.gadm.level2.name}</td>
          </tr>
        </tbody>
      </Table>
      <Table className={styles.stripeColour} striped bordered size="sm">
        <thead>
          <tr>
            <td>Latitide</td>
            <td>Longitude</td>
            <td>Elevation</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{occurence?.decimalLatitude}</td>
            <td>{occurence?.decimalLongitude}</td>
            <td>{occurence?.elevation}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SingleOccurencePage;
