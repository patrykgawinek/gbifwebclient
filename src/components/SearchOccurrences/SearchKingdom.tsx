import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Theme } from '../../App/App';
import { useContext } from 'react';
import styles from './SearchKingdom.module.css';
import { Classification } from '../../types';

type SearchKingdomProps = {
  setSelectedKingdom: Dispatch<SetStateAction<number>>;
  setShowItems: Dispatch<SetStateAction<boolean[]>>;
  setLastSelection: Dispatch<SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchKingdom: React.FC<SearchKingdomProps> = ({
  setSelectedKingdom,
  setShowItems,
  setLastSelection,
  setOffset,
}) => {
  const { darkMode } = useContext(Theme);

  const [kingdomList, setKingdomList] = useState<Classification[]>([]);
  const baseUrlApi: string = 'https://api.gbif.org/v1';
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrlApi}/species/suggest`, {
        params: {
          rank: 'kingdom',
        },
      })
      .then((response) => {
        let tempList = response.data;
        setKingdomList(tempList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOnClick = (kingdom: Classification) => () => {
    setSelectedKingdom(kingdom.key);
    setLastSelection(kingdom.key);
    setShowItems([true, true, false, false, false, false, false]);
    setOffset(0);
  };

  return (
    <Container fluid>
      {loading ? (
        <Row className="justify-content-center">
          <Spinner className="" animation="border" role="status" variant={darkMode ? 'light' : 'primary'}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row className="justify-content-center" xs={3} sm={3} md={4} lg={4} xl="auto">
          {kingdomList.map((kingdom: Classification) => (
            <Col className={styles.columnPadding} key={kingdom.key}>
              <Button
                className={styles.kingdomButton}
                variant={darkMode ? 'dark' : 'outline-primary'}
                value={kingdom.key}
                key={kingdom.key}
                onClick={handleOnClick(kingdom)}
              >
                {kingdom.scientificName}
              </Button>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
