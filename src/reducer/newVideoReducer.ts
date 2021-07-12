// redux-toolkit 支持非纯函数，可使用 push 等方法
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import subscibe from "../api/subscibe";
import VideoAsJson from "../api/types/VideoAsJson";

const initialState: VideoAsJson[] = [];

export const initNewVideos = createAsyncThunk(
  "newVideo/initNewVideos",
  async () => {
    const newVideos = await subscibe.getAllUpdates();
    return newVideos;
  }
);

export const newVideoSlice = createSlice({
  name: "newVideo",
  initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<VideoAsJson>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initNewVideos.pending, () => []);
    builder.addCase(initNewVideos.fulfilled, (state, action) => {
      action.payload.forEach((newVideo) => {
        state.push(newVideo);
      });
    });
  },
});

export const { addVideo } = newVideoSlice.actions;
export default newVideoSlice.reducer;
