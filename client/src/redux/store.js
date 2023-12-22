import { configureStore } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertsSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
