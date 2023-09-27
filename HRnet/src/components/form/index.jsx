import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Dropdown from "@baptistej/react-dropdown";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import axios from "axios";
import { capitalizeFirstLetter, formatDateToString } from "../../utils/utils";
import * as EmployeesActions from "../../features/employees";

import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const { register, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;

  const dispatch = useDispatch();

  const [states, setStates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [birthdate, setBirthdate] = useState(null);
  const [startdate, setStartdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);

  const formRef = useRef(null);

  ReactModal.setAppElement("#root");

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

  const handleReset = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setResetDropdown(!resetDropdown);
    formRef.current.reset();
    setBirthdate(null);
    setStartdate(null);
  };

  const onSubmit = (data) => {
    if (checkValidity(data)) {
      data.birthdate = formatDateToString(birthdate);
      data.startdate = formatDateToString(startdate);
      setShowModal(true);
      console.log("Form submitted :", data);
      dispatch(EmployeesActions.addEmployee(data));
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
      "zip",
      "department",
    ];

    const validationRules = {
      firstname: (value) => {
        return value.length >= 3;
      },
      lastname: (value) => {
        return value.length >= 3;
      },
      birthdate: (date) => {
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        return date <= eighteenYearsAgo;
      },
      startdate: (startdate) => {
        const ageAtAdmission =
          startdate.getFullYear() - birthdate.getFullYear();
        return ageAtAdmission >= 18;
      },
      state: (value) => {
        return states.includes(value);
      },
      department: (value) => {
        return departments.includes(value);
      },
      zip: (value) => {
        return value.length === 5 && !isNaN(value);
      },
      street: (value) => {
        return value.length >= 5;
      },
      city: (value) => {
        return value.length >= 3;
      },
    };

    const hasAllRequiredFields = requiredFields.every(
      (fieldName) => !!data[fieldName]
    );

    const areAllFieldsValid = requiredFields.every((fieldName) => {
      const validationRule = validationRules[fieldName];
      if (validationRule) {
        return validationRule(data[fieldName]);
      }
      return !errors[fieldName];
    });
    return hasAllRequiredFields && areAllFieldsValid;
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
    <form className="form" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
                    : setStartdate(date);
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
              reset={resetDropdown}
            />
          </label>
          <label {...labelProps("zip")}>
            <span className="label__title">ZIP Code</span>
            <input {...inputProps("zip")} />
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
          reset={resetDropdown}
        />
      </label>
      <button type="submit" className="button">
        <span>Save</span>
      </button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Success Modal"
        className="create-employee__modal"
        overlayClassName="create-employee__modal__overlay"
      >
        <p>New Employee Created !</p>
        <button className="button" onClick={handleReset}>
          Close
        </button>
      </ReactModal>
    </form>
  );
};

export default Form;
