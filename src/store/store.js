import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import employeeReducer from '../features/employeeSlice'
import addressReducer from '../features/addressSlice'
import projectReducer from '../features/projectSlice'
import companyReducer from '../features/companySlice'

export const store = configureStore({
  reducer: {
    company: companyReducer,
    address: addressReducer,
    project: projectReducer,
    employee: employeeReducer,
  },middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }, ['redux-immutable-state-invariant'] ),
  devTools: true
  
})
