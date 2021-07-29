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
        method: "PUT",
        body: project,
        headers:{
          'Access-Control-Allow-Origin': '*'
        }
      }),
      response = await resp.json();

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

    // [updateProject.fulfilled]: (state, action) => {

    //   return [...state]
    // }
  },
});

export const selectAllProjects = (state) => state.project.projects;

export default projectSlice.reducer;
