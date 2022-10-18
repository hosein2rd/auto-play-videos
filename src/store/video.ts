import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "videos",
  initialState: { loading: false, list: [] },
  reducers: {
    videoRequested: (video) => {
      video.loading = true;
    },
    videoReceived: (video, action) => {
      video.list = action.payload.data;
      video.loading = false;
    },
  },
});

export const { videoReceived, videoRequested } = slice.actions;
export default slice.reducer;
