// redux-toolkit 支持非纯函数，可使用 push 等方法
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import subscibe from "../api/subscibe";
import { UperAsJsonWhileGet } from "../api/types/UperAsJson";

const initialState: UperAsJsonWhileGet[] = [];

export const initUpers = createAsyncThunk("uper/initUpers", async () => {
  const upers = await subscibe.getAll();
  return upers;
});

export const uperSlice = createSlice({
  name: "uper",
  initialState,
  reducers: {
    addUper: (state, action: PayloadAction<UperAsJsonWhileGet>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUpers.pending, () => []);
    builder.addCase(initUpers.fulfilled, (state, action) => {
      action.payload.forEach((newUper) => {
        state.push(newUper);
      });
    });
  },
});

export const { addUper } = uperSlice.actions;
export default uperSlice.reducer;
