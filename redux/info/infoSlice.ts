import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InfoAPI } from "./infoAPI";
import { infoEntity } from "./infoEntity";

export const fetchAllInfo = createAsyncThunk("info/fetchAllInfo", async () => {
  const response = await InfoAPI.fetchAllInfo();
  return response;
});

interface infoState {
  info: infoEntity[];
}

const initialState: infoState = {
  info: [],
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllInfo.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});

export default infoSlice.reducer;
