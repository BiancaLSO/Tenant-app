import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueAPI } from "./issueAPI";
import { IssueEntity } from "./issueEntity";

export const fetchAllIssues = createAsyncThunk("issue/fetchAllIssues", async () => {
  const response = await IssueAPI.fetchAllIssues();
  console.log("response from thunk", response.data);
  return response;
});
export const fetchUserIssues = createAsyncThunk("issue/fetchUserIssues", async () => {
  // here make it not hardcoded, to take id from logged in user
  const response = await IssueAPI.fetchUserIssues(1);
  console.log("response from thunk", response.data);
  return response;
});

interface issueState {
  issues: IssueEntity[];
  userIssues: IssueEntity[];
}

const initialState: issueState = {
  issues: [],
  userIssues: [],
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
    builder.addCase(fetchUserIssues.fulfilled, (state, action) => {
      state.userIssues = action.payload;
    });
  },
});

export default issueSlice.reducer;
