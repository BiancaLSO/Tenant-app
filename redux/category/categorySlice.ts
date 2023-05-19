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
  selectedCategory: CategoryEntity | null;
}

const initialState: categoryState = {
  categories: [],
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<CategoryEntity>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});
export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
