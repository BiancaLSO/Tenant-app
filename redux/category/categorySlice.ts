import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryAPI } from "./categoryAPI";
import { CategoryEntity } from "./categoryEntity";

export const fetchAllCategories = createAsyncThunk("category/fetchAllCategories", async () => {
  const response = await CategoryAPI.fetchAllCategories();
  console.log("response from thunk", response.data);
  return response;
});

interface categoryState {
  categories: CategoryEntity[];
}

const initialState: categoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
