import { Form } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext, useEffect, useState } from "react";
import styles from "./SelectCountry.module.css";
import axios from "axios";

interface SelectCountryProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCountry = ({ setCountry }: SelectCountryProps) => {
  const { darkMode } = useContext(Theme);
  const [countries, setCountries] = useState<any>();

  useEffect(() => {
    axios
      .get(`data/countryCodes.json`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Form.Select
      className={`mb-3 ${darkMode ? styles.formDark : undefined}`}
      onChange={(event) => setCountry(event.target.value)}
    >
      <option key={"empty"} value={""}>
        Show all results
      </option>
      {countries?.map((country: any) => (
        <option value={country.Code} key={country.Code}>
          {country.Name}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectCountry;
