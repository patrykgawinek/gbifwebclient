import { Form } from "react-bootstrap";
import { Theme } from "components/App/App";
import { useContext, useEffect, useState } from "react";
import styles from "./SelectCountry.module.css";
import axios from "axios";

interface SelectCountryProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCountry = ({ setCountry, setOffset }: SelectCountryProps) => {
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

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> | undefined = (event) => {
    setCountry(event.target.value);
    setOffset(0);
  };

  return (
    <Form.Select
      className={`mb-3 ${darkMode ? styles.formDark : undefined}`}
      onChange={handleOnChange}
    >
      <option key={"empty"} value={""}>
        Show results in all countries
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
