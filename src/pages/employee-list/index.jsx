// Libraries
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmployees } from "../../utils/selectors";
import SearchBar from "../../components/searchbar";
import DataTable from "react-data-table-component";

// column definition for the table
const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstname,
    sortable: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastname,
    sortable: true,
  },
  {
    name: "Birth Date",
    selector: (row) => row.birthdate,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.startdate,
    sortable: true,
  },
  {
    name: "Street",
    selector: (row) => row.street,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zip,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
];

/**
 * description: EmployeeList page
 * @return {JSX} - EmployeeList page
 */
const EmployeeList = () => {
  const employees = useSelector(selectEmployees);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  /**
   * description: Clear the search bar
   * @param {Object} e - Event object
   */
  const handleClear = (e) => {
    e.preventDefault();
    setSearch("");
  };

  /**
   * description: Filter the employees
   * @param {Object} e - Event object
   * @param {string} e.target.value - Value of the search bar
   * @return {JSX} - EmployeeList page with the filtered employees
   */
  const handleFilter = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  /**
   * description: function to filter the employees
   * @param {Array} employees - Array of employees
   * @param {string} search - Value of the search bar
   * @return {Array} - Array of filtered employees
   * @example
   * // returns filtered employees
   * filterEmployees(employees, search);
   */
  const filterEmployees = (employees, search) => {
    console.log("employees : ", employees, "search :", search);
    return employees.filter((employee) => {
      return (
        employee.firstname.toLowerCase().includes(search.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(search.toLowerCase()) ||
        employee.birthdate.toLowerCase().includes(search.toLowerCase()) ||
        employee.startdate.toLowerCase().includes(search.toLowerCase()) ||
        employee.street.toLowerCase().includes(search.toLowerCase()) ||
        employee.city.toLowerCase().includes(search.toLowerCase()) ||
        employee.state.toLowerCase().includes(search.toLowerCase()) ||
        employee.zip.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  // filter the employees when the search bar value changes
  useEffect(() => {
    if (search === "") setFilteredEmployees(employees);
    else {
      setFilteredEmployees(filterEmployees(employees, search));
    }
  }, [employees, search]);

  // render the page
  return (
    <div className="employee-list">
      <h2>Current Employees</h2>
      <div className="employee-list__content">
        <SearchBar
          filterText={search}
          onClear={handleClear}
          onFilter={handleFilter}
          className="employee-list__searchbar"
        />
        <DataTable
          title="Employees List"
          columns={columns}
          data={filteredEmployees}
          pagination={true}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          paginationComponentOptions={{
            rowsPerPageText: "Employees per page:",
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
          noDataComponent="No Employees Found"
          striped={true}
          highlightOnHover={true}
          pointerOnHover={false}
          persistTableHead={true}
          fixedHeader={true}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
