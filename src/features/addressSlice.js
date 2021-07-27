import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL, GET_ADDRESS } from '../constants/constants';

const initialState = {
  address: [],
  status: 'idle',
  error: null
}

/**
 * Thunk for Retrieveing Address list
 *
 * @return {object} Array containing Address objects
*/
export const getAddress = createAsyncThunk(`stamped/${GET_ADDRESS}`, async () => {  
  const resp = await fetch(`${API_URL}/api/address`, { method: 'GET' }),
  data = await resp.json();
  
  return data;
})

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getAddress.fulfilled]: (state, action) => {

      state.address.push(action.payload)
    }
  }
  
})



export const selectAllAddress = (state) => state.address.address

export default addressSlice.reducer
