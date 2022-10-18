import { createAction } from "@reduxjs/toolkit";
import { APIPayload } from "../types";

export const apiCall = createAction<APIPayload>("apiCallBegan");
