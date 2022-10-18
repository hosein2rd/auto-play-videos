import { configureStore, combineReducers } from "@reduxjs/toolkit";
import videoReducer from "./video";
import apiMiddelware from "./middleware/api";

const reducer = combineReducers({ video: videoReducer });

const store = configureStore({ reducer, middleware: [apiMiddelware] });

export default store;
