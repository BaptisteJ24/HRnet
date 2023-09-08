import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        setStates(res.data.State);
        setDepartments(res.data.Department);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit()}>
      <div className="form__content">
        <div className="form__content__wrapper">
          <label
            data-error="A firstname is required."
            data-isvalid={!errors.firstname}
          >
            <span className="label__title">Firstname</span>
            <input
              type="text"
              id="name"
              placeholder="Name"
              {...register("firstname", { required: true })}
            />
          </label>
          <label
            data-error="A lastname is required."
            data-isvalid={!errors.lastname}
          >
            <span className="label__title">Lastname</span>
            <input
              type="text"
              id="lastname"
              placeholder="Lastname"
              {...register("lastname", { required: true })}
            />
          </label>
          <label
            data-error="A valid birthdate is required."
            data-isvalid={!errors.birthdate}
          >
            <span className="label__title">Birthdate</span>
            <input
              type="date"
              id="birthdate"
              {...register("birthdate", { required: true })}
            />
          </label>
          <label
            data-error="A valid startdate is required."
            data-isvalid={!errors.startdate}
          >
            <span className="label__title">Startdate</span>
            <input
              type="date"
              id="startdate"
              {...register("startdate", { required: true })}
            />
          </label>
        </div>
        <div className="form__content__wrapper">
          <label
            data-error="A valid street is required."
            data-isvalid={!errors.street}
          >
            <span className="label__title">Street</span>
            <input
              type="text"
              id="street"
              placeholder="Street"
              {...register("street", { required: true })}
            />
          </label>
          <label
            data-error="A valid city is required."
            data-isvalid={!errors.city}
          >
            <span className="label__title">City</span>
            <input
              type="text"
              id="city"
              placeholder="City"
              {...register("city", { required: true })}
            />
          </label>
          <label>
            <span className="label__title">State</span>
            <select
              id="state"
              placeholder="State"
              {...register("state", { required: true })}
            >
              {states.map((state, index) => (
                <option value={state} key={`${index}${state}`}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label
            data-error="A valid ZIP Code is required."
            data-isvalid={!errors.zipcode}
          >
            <span className="label__title">ZIP Code</span>
            <input
              type="text"
              id="zipcode"
              placeholder="ZIP Code"
              {...register("zipcode", { required: true })}
            />
          </label>
        </div>
      </div>
      <label>
        <span className="label__title">Department</span>
        <select
          id="department"
          placeholder="Department"
          {...register("department", { required: true })}
        >
          {departments.map((department, index) => (
            <option value={department} key={`${index}${department}`}>
              {department}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="button">
        <span>Save</span>
      </button>
    </form>
  );
};

export default Form;
