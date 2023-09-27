import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees";

/**
 * description: configure the store with all reducers.
 */
export default configureStore({
  reducer: {
    employees: employeesReducer,
  },
});
