import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [
    {
      id: 1,
      firstname: "Bruce",
      lastname: "Wayne",
      birthdate: "1985-03-15",
      startdate: "2010-07-22",
      street: "123 Main Street",
      city: "Gotham",
      state: "New York",
      zip: "10001",
      department: "Engineering",
    },
    {
      id: 2,
      firstname: "Oliver",
      lastname: "Queen",
      birthdate: "1990-08-20",
      startdate: "2015-05-10",
      street: "456 Elm Street",
      city: "Star City",
      state: "California",
      zip: "90001",
      department: "Human Resources",
    },
    {
      id: 3,
      firstname: "Matthew",
      lastname: "Murdock",
      birthdate: "1988-12-10",
      startdate: "2012-09-18",
      street: "789 Oak Avenue",
      city: "Hell's Kitchen",
      state: "New York",
      zip: "60601",
      department: "Legal",
    },
  ],
};

const employeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const {
        firstname,
        lastname,
        birthdate,
        startdate,
        street,
        city,
        state: employeeState,
        zip,
        department,
      } = action.payload;

      if (
        firstname &&
        lastname &&
        birthdate &&
        startdate &&
        street &&
        city &&
        employeeState &&
        zip &&
        department
      ) {
        const lastId = state.employees.reduce((max, employee) => {
          return employee.id > max ? employee.id : max;
        }, 0);

        const newEmployee = {
          id: lastId + 1,
          firstname,
          lastname,
          birthdate,
          startdate,
          street,
          city,
          state: employeeState,
          zip,
          department,
        };

        state.employees.push(newEmployee);
      } else {
        console.error(
          "action.payload doit contenir toutes les informations nécessaires."
        );
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

const { actions, reducer } = employeesSlice;

export const { addEmployee, removeEmployee, updateEmployee } = actions;

export default reducer;
