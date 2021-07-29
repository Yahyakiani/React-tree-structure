import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, GET_PROJECTS, UPDATE_PROJECTS } from "../constants/constants";

const initialState = {
  projects: [],
  status: "idle",
  error: null,
};

/**
 * Thunk for updating Project
 *
 *
 */
export const updateProject = createAsyncThunk(
  `stamped/${UPDATE_PROJECTS}`,
  async (project) => {
    const resp = await fetch(`${API_URL}/api/projects/update_project`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Request-Method':'PUT'
        }
      }),
      response = await resp.json();
      console.log(response);

    return response;
  }
);
/**
 * Thunk for Retrieveing Project list
 *
 */
export const getProjects = createAsyncThunk(
  `stamped/${GET_PROJECTS}`,
  async () => {
    const resp = await fetch(`${API_URL}/api/projects`, { method: "GET" }),
      data = await resp.json();
      console.log(data);

    return data;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload
    },

    [updateProject.fulfilled]: (state, action) => {

      const {id} = action.payload
      let proj = state.projects.find(p => p.id === id);
      proj = action.payload;
    }
  },
});

export const selectAllProjects = (state) => state.project.projects;
export const projectStatus = (state) => state.project.status;

export default projectSlice.reducer;
