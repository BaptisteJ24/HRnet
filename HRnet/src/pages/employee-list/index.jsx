import { useSelector, useDispatch } from "react-redux";
import { selectEmployees } from "../../utils/selectors";
// import * as EmployeeActions from "./../../features/employees";
import DataTable from "react-data-table-component";

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

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);

  return (
    <div className="employee-list">
      <h2>Current Employees</h2>
      <DataTable
        title="Employees List"
        columns={columns}
        data={employees}
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
      />
    </div>
  );
};

export default EmployeeList;
