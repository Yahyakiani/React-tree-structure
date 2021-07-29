import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL, GET_EMPLOYEES } from '../constants/constants';

const initialState = {
  employees: [],
  status: 'idle',
  error: null
}

/**
 * Thunk for Retrieveing Employee list
 *
 * @return {object} Array containing Employee objects
*/
export const getEmployees = createAsyncThunk(`stamped/${GET_EMPLOYEES}`, async () => {  
  const resp = await fetch(`${API_URL}/api/employee`, { method: 'GET' }),
  data = await resp.json();
  
  return data;
})

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getEmployees.fulfilled]: (state, action) => {

      state.employees = action.payload
    }
  }
  
})


export const selectAllEmployee = (state) => state.employee.employees
export const selectEmployeeByCompany = (state,id) => state.employee.employees.filter(emp=>emp.companyId===id)

export default employeeSlice.reducer
