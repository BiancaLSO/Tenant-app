import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IssueAPI } from "./issueAPI";
import { IssueEntity } from "./issueEntity";
import { sub } from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";

export const fetchAllIssues = createAsyncThunk(
  "issue/fetchAllIssues",
  async () => {
    const response = await IssueAPI.fetchAllIssues();
    return response;
  }
);

export const fetchUserIssues = createAsyncThunk(
  "issue/fetchUserIssues",
  async (userId: number | undefined) => {
    const response = await IssueAPI.fetchUserIssues(userId);
    return response;
  }
);

export const createIssue = createAsyncThunk(
  "issue/create",
  async (
    payload: {
      issue: IssueEntity;
      userId?: number;
      categoryId?: number | undefined;
    },
    thunkAPI
  ) => {
    const { issue, userId, categoryId } = payload; // Destructure the payload object

    // const userId: number | undefined = useSelector((state: RootState) => state.users.user?.id);

    const response = IssueAPI.createIssue(issue, userId, categoryId);
    return response;
  }
);

export const fetchSearchIssues = createAsyncThunk(
  "issue/search",
  async (subject: string) => {
    const response = await IssueAPI.fetchSearchedIssues(subject);
    return response;
  }
);
export const fetchFilteredIssues = createAsyncThunk(
  "issue/filter/filters",
  async (category: string) => {
    const response = await IssueAPI.fetchFilteredIssues(category);
    return response;
  }
);

export const deleteIssue = createAsyncThunk(
  "issues/deleteIssue",
  async (id: number | undefined) => {
    try {
      const response = await IssueAPI.deleteIssue(id);
      return response;
    } catch (error) {
      console.error(`Error deleting issue with ID ${id}:`, error);
      throw error;
    }
  }
);

interface issueState {
  issues: IssueEntity[];
  userIssues: IssueEntity[];
  searchedIssues: IssueEntity[];
  filteredIssues: IssueEntity[];
  removeIssues: IssueEntity[];
  loading: boolean;
  photoToDisplay: any | null;
}

const initialState: issueState = {
  issues: [],
  userIssues: [],
  photoToDisplay: null,
  searchedIssues: [],
  filteredIssues: [],
  loading: false,
  removeIssues: [],
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
    builder.addCase(fetchSearchIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchIssues.fulfilled, (state, action) => {
      state.searchedIssues = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSearchIssues.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(fetchFilteredIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredIssues.fulfilled, (state, action) => {
      state.filteredIssues = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFilteredIssues.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteIssue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteIssue.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default issueSlice.reducer;
