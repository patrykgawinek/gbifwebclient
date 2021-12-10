import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./SearchKingdom.module.css";

interface SearchKingdomProps {
  selectedKingdom: number;
  setSelectedKingdom: Dispatch<SetStateAction<number>>;
  showItems: boolean[];
  setShowItems: Dispatch<SetStateAction<boolean[]>>;
  setLastSelection: Dispatch<SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SearchKingdom = ({
  selectedKingdom,
  setSelectedKingdom,
  showItems,
  setShowItems,
  setLastSelection,
  setOffset,
}: SearchKingdomProps) => {
  const [kingdomList, setKingdomList] = useState<any>([]);
  const baseUrlApi: string = "https://api.gbif.org/v1";

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/species/suggest`, {
        params: {
          rank: "kingdom",
        },
      })
      .then((response) => {
        let tempList = response.data;
        setKingdomList(tempList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedKingdom]);

  const handleOnClick = (kingdom: any) => {
    setSelectedKingdom(kingdom.kingdomKey);
    setLastSelection(kingdom.kingdomKey);
    setShowItems([true, true, false, false, false, false, false]);
    setOffset(0);
  };

  return (
    <Container>
      <Row>
        {kingdomList.map((kingdom: any) => (
          <Col md="auto">
            <Button
              variant="outline-primary"
              value={kingdom.kingdomKey}
              key={kingdom.kingdomKey}
              onClick={() => handleOnClick(kingdom)}
            >
              {kingdom.scientificName}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchKingdom;
