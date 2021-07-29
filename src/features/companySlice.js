import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL, GET_COMPANIES } from '../constants/constants';

const initialState = {
  companies: [],
  status: 'idle',
  error: null
}

/**
 * Thunk for Retrieveing Company list
 *
 * @return {object} Array containing company objects
*/
export const getCompanies = createAsyncThunk(`stamped/${GET_COMPANIES}`, async () => {  
  const resp = await fetch(`${API_URL}/api/companies`, { method: 'GET' }),
  data = await resp.json();
    
  return data;
})


export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
   
  },
  extraReducers: {
    [getCompanies.fulfilled]: (state, action) => {

      state.companies=action.payload
    }
  }
  
})

// export const { addCompanies } = companySlice.actions


export const selectAllCompanies = (state) => state.company.companies

export default companySlice.reducer
