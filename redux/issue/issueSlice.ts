import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueAPI } from "./issueAPI";
import { IssueEntity } from "./issueEntity";

export const fetchAllIssues = createAsyncThunk("issue/fetchAllIssues", async () => {
  const response = await IssueAPI.fetchAllIssues();
  return response;
});
export const fetchUserIssues = createAsyncThunk("issue/fetchUserIssues", async (userId: number | undefined) => {
  const response = await IssueAPI.fetchUserIssues(userId);
  return response;
});

export const createIssue = createAsyncThunk("issue/create", async (payload: { issue: IssueEntity; userId?: number; categoryId?: number | undefined }, thunkAPI) => {
  const { issue, userId, categoryId } = payload; // Destructure the payload object

  // const userId: number | undefined = useSelector((state: RootState) => state.users.user?.id);

  const response = IssueAPI.createIssue(issue, userId, categoryId);
  return response;
});

interface issueState {
  issues: IssueEntity[];
  userIssues: IssueEntity[];
  photoToDisplay: any | null;
}

const initialState: issueState = {
  issues: [],
  userIssues: [],
  photoToDisplay: null,
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setPhotoToDisplay: (state, action: PayloadAction<any>) => {
      state.photoToDisplay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
    builder.addCase(fetchUserIssues.fulfilled, (state, action) => {
      state.userIssues = action.payload;
    });
    builder.addCase(createIssue.fulfilled, (state, action) => {
      state.issues.push(action.payload);
    });
  },
});

export default issueSlice.reducer;
