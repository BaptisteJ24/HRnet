import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "@baptistej/react-dropdown";
import { capitalizeFirstLetter } from "../../utils/utils";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const Form = ({ handleShowModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [birthdate, setBirthdate] = useState(null);
  const [startdate, setStartDate] = useState(null);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        const { State, Department } = res.data;
        setStates(State);
        setDepartments(Department);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    if (checkValidity(data)) {
      console.log("Form submitted successfully :", data);
      handleShowModal(true);
    } else {
      console.log("Form not submitted. Please check the fields :", data);
    }
  };

  const checkValidity = (data) => {
    const requiredFields = [
      "firstname",
      "lastname",
      "birthdate",
      "startdate",
      "street",
      "city",
      "state",
      "zipcode",
      "department",
    ];

    const hasAllRequiredFields = requiredFields.every(
      (fieldName) => !!data[fieldName]
    );

    const areAllFieldsValid = requiredFields.every(
      (fieldName) => !errors[fieldName]
    );

    const birthdateIsValid = () => {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      return birthdate <= eighteenYearsAgo;
    };

    return hasAllRequiredFields && areAllFieldsValid && birthdateIsValid();
  };

  const dropdownStyles = {
    dropdown: {
      margin: "0",
    },
    dropdownSelected: {
      width: "100%",
      padding: "5px",
      height: "35px",
      border: "1px solid #13262f",
      borderRadius: "0.25rem",
    },
    dropdownSelectedText: {
      color: "#13262f",
    },
    dropdownArrow: {
      border: "solid #13262f",
      borderWidth: "0 2px 2px 0",
    },
  };

  const labelProps = (name) => ({
    className: "form__label",
    "data-error": `A valid ${name} is required.`,
    "data-isvalid": `${!errors[name]}`,
  });

  const inputProps = (name) => ({
    type: "text",
    id: name,
    placeholder: capitalizeFirstLetter(name),
    ...register(name, { required: true }),
  });

  const handleFieldChange = (name, value) => {
    setValue(name, value);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__content">
        <div className="form__content__wrapper">
          {["firstname", "lastname"].map((name) => (
            <label key={name} {...labelProps(name)}>
              <span className="label__title">
                {capitalizeFirstLetter(name)}
              </span>
              <input {...inputProps(name)} />
            </label>
          ))}
          {["birthdate", "startdate"].map((name) => (
            <label key={name} {...labelProps(name)}>
              <span className="label__title">
                {capitalizeFirstLetter(name)}
              </span>
              <DatePicker
                id={name}
                selected={name === "birthdate" ? birthdate : startdate}
                onChange={(date) => {
                  handleFieldChange(name, date);
                  name === "birthdate"
                    ? setBirthdate(date)
                    : setStartDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText={capitalizeFirstLetter(name)}
                className="form__date-picker"
              />
            </label>
          ))}
        </div>
        <div className="form__content__wrapper">
          {["street", "city"].map((name) => (
            <label key={name} {...labelProps(name)}>
              <span className="label__title">
                {capitalizeFirstLetter(name)}
              </span>
              <input {...inputProps(name)} />
            </label>
          ))}
          <label className="form__label">
            <span className="label__title">State</span>
            <Dropdown
              id="state"
              placeholder="Select a State..."
              data={states}
              styles={dropdownStyles}
              onSelected={(value) => handleFieldChange("state", value)}
            />
          </label>
          <label {...labelProps("zipcode")}>
            <span className="label__title">ZIP Code</span>
            <input {...inputProps("zipcode")} />
          </label>
        </div>
      </div>
      <label className="form__label">
        <span className="label__title">Department</span>
        <Dropdown
          id="department"
          placeholder="Select a Department..."
          data={departments}
          styles={dropdownStyles}
          onSelected={(value) => handleFieldChange("department", value)}
        />
      </label>
      <button type="submit" className="button">
        <span>Save</span>
      </button>
    </form>
  );
};

Form.defaultProps = {
  handleShowModal: () => {},
};

Form.propTypes = {
  handleShowModal: PropTypes.func,
};

export default Form;
