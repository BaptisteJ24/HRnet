// Redux slice : employees

import { createSlice } from "@reduxjs/toolkit";

/**
 * description: initial state of the employees slice. Contains a list of employees.
 */
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
    {
      id: 4,
      firstname: "Diana",
      lastname: "Prince",
      birthdate: "1980-07-02",
      startdate: "2005-11-15",
      street: "567 Pine Street",
      city: "Themyscira",
      state: "Virgin Island",
      zip: "12345",
      department: "Marketing",
    },
    {
      id: 5,
      firstname: "Barry",
      lastname: "Allen",
      birthdate: "1992-04-30",
      startdate: "2017-08-08",
      street: "789 Cedar Lane",
      city: "Central City",
      state: "Missouri",
      zip: "65432",
      department: "Information Technology",
    },
    {
      id: 6,
      firstname: "Selina",
      lastname: "Kyle",
      birthdate: "1983-06-20",
      startdate: "2014-03-25",
      street: "101 Cat Alley",
      city: "Gotham",
      state: "New York",
      zip: "10002",
      department: "Finance",
    },
    {
      id: 7,
      firstname: "Clark",
      lastname: "Kent",
      birthdate: "1978-09-12",
      startdate: "2003-12-05",
      street: "234 Krypton Lane",
      city: "Metropolis",
      state: "Illinois",
      zip: "54321",
      department: "Engineering",
    },
    {
      id: 8,
      firstname: "Hal",
      lastname: "Jordan",
      birthdate: "1981-02-05",
      startdate: "2011-06-30",
      street: "345 Lantern Road",
      city: "Coast City",
      state: "California",
      zip: "90002",
      department: "Human Resources",
    },
    {
      id: 9,
      firstname: "Peter",
      lastname: "Parker",
      birthdate: "1995-01-15",
      startdate: "2018-09-22",
      street: "456 Spider Lane",
      city: "New York",
      state: "New York",
      zip: "10003",
      department: "Legal",
    },
    {
      id: 10,
      firstname: "Natasha",
      lastname: "Romanoff",
      birthdate: "1984-03-25",
      startdate: "2013-07-12",
      street: "567 Widow Avenue",
      city: "Malibu",
      state: "California",
      zip: "12346",
      department: "Marketing",
    },
    {
      id: 11,
      firstname: "Tony",
      lastname: "Stark",
      birthdate: "1970-12-30",
      startdate: "1998-05-18",
      street: "678 Iron Street",
      city: "Malibu",
      state: "California",
      zip: "90003",
      department: "Information Technology",
    },
    {
      id: 12,
      firstname: "Steve",
      lastname: "Rogers",
      birthdate: "1920-07-04",
      startdate: "1941-03-10",
      street: "789 Patriot Lane",
      city: "Brooklyn",
      state: "New York",
      zip: "10004",
      department: "Finance",
    },
    {
      id: 13,
      firstname: "Thor",
      lastname: "Odinson",
      birthdate: "1989-11-15",
      startdate: "2016-02-20",
      street: "890 Thunder Road",
      city: "Asgard",
      state: "Hawaii",
      zip: "54322",
      department: "Engineering",
    },
    {
      id: 14,
      firstname: "Wanda",
      lastname: "Maximoff",
      birthdate: "1987-05-03",
      startdate: "2012-08-10",
      street: "101 Scarlet Lane",
      city: "Malibu",
      state: "California",
      zip: "65433",
      department: "Human Resources",
    },
    {
      id: 15,
      firstname: "Bruce",
      lastname: "Banner",
      birthdate: "1975-08-08",
      startdate: "2000-11-25",
      street: "202 Gamma Street",
      city: "Belle Fourche",
      state: "South Dakota",
      zip: "10005",
      department: "Legal",
    },
    {
      id: 16,
      firstname: "Carol",
      lastname: "Danvers",
      birthdate: "1986-06-18",
      startdate: "2015-04-15",
      street: "303 Captain Avenue",
      city: "Hala",
      state: "Virgin Island",
      zip: "12347",
      department: "Marketing",
    },
  ],
};

/**
 * description: slice containing the employees list and the addEmployee action.
 */
const employeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    /**
     * description: adds an employee to the employees list.
     */
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

      // Check if all the required fields are present. If so, add the employee to the list. Also add an id to the new employee based on the last id in the list.
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
        console.log("Employee ajouté avec succès.");
      } else {
        console.error(
          "action.payload doit contenir toutes les informations nécessaires."
        );
      }
    },
  },
});

const { actions, reducer } = employeesSlice;

export const { addEmployee } = actions;

export default reducer;
