import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL, GET_PROJECTS, UPDATE_PROJECTS } from '../constants/constants';

const initialState = {
  projects: [],
  status: 'idle',
  error: null
}

/**
 * Thunk for Retrieveing Project list
 *
 * @return {object} Array containing Project objects
*/
export const updateProject = createAsyncThunk(`stamped/${GET_PROJECTS}`, async (project) => {  
  const resp = await fetch(`${API_URL}/api/projects`, { method: 'GET',body:project }),
  data = await resp.json();
  
  return data;
})
/**
 * Thunk for updating Project 
 *
*/
export const getProjects = createAsyncThunk(`stamped/${UPDATE_PROJECTS}`, async () => {  
  const resp = await fetch(`${API_URL}/api/projects/update_project`, { method: 'PUT' }),
  data = await resp.json();
  
  return data;
})

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {

      state.projects.push(action.payload)
    },

    [updateProject.fulfilled]: (state, action) => {

      return [...state]
    }
  }
  
})

export const selectAllProjects = (state) => state.project.projects

export default projectSlice.reducer
