import { Form } from "react-bootstrap";
import { Theme } from "../../App/App";
import { useContext, useEffect, useState } from "react";
import styles from "./SelectCountry.module.css";
import axios from "axios";
import { Country } from "../../types";

type SelectCountryProps = {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const SelectCountry: React.FC<SelectCountryProps> = ({ country, setCountry, setOffset }) => {
  const { darkMode } = useContext(Theme);
  const [countries, setCountries] = useState<Country[]>();

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

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCountry(event.target.value);
    setOffset(0);
  };

  return (
    <Form.Select className={`mb-3 ${darkMode ? styles.formDark : undefined}`} onChange={handleOnChange} value={country}>
      <option key={"empty"} value={""}>
        Show results in all countries
      </option>
      {countries?.map((country: Country) => (
        <option value={country.Code} key={country.Code}>
          {country.Name}
        </option>
      ))}
    </Form.Select>
  );
};
