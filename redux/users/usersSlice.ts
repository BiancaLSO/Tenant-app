import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersEntity } from "./usersEntity";
import * as SecureStore from "expo-secure-store";
import { UsersAPI } from "../users/usersAPI";
import { SignUpUser } from "./signupuserEntity";

// First, create the thunk
export const login = createAsyncThunk(
  "auth/login", // This is a name for the thunk (must be unique) not the endpoint
  async (user: UsersEntity, thunkAPI) => {
    const response = await UsersAPI.login(user);

    // Parsing number id into string
    const idString = JSON.stringify(response.id);

    console.log(response.id);
    console.log(response.access_token);

    // save to secure store
    SecureStore.setItemAsync("token", response.access_token);
    SecureStore.setItemAsync("id", idString);

    return response;
  }
);

export const signup = createAsyncThunk(
  "auth/signup", // This is a name for the thunk (must be unique) not the endpoint
  async (userSignup: SignUpUser, thunkAPI) => {
    const response = UsersAPI.signup(userSignup);

    return response;
  }
);

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async () => {
    try {
      // Get id from SecureStorage
      const idString: string | null = await SecureStore.getItemAsync("id");
      const id: number | null = idString ? JSON.parse(idString) : null;

      // Get token
      const token: string | null = await SecureStore.getItemAsync("token");

      const response = await UsersAPI.fetchUserData(id, token);

      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }
);

interface UsersState {
  token: string | undefined | null;
  error: string | undefined;
  user: UsersEntity | null;
}

const initialState = {
  token: null,
  error: undefined,
  user: {} as UsersEntity | null,
} as UsersState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.error = undefined;
    },
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("running signup fulfilled");
      state.error = undefined;
      // if (action.payload.id != undefined) {
      //   state.error = "Signup success";
      // }
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("running login fulfilled");
      state.error = undefined;
      state.token = action.payload?.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 401") {
        state.error = "Invalid login";
        state.token = null;
      }

      console.log("error in slice", action.error);
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log("running fetchUserData fulfilled");
      state.user = action.payload;
      state.error = undefined;
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("fetchUserData rejected");
      state.error = "Error fetching user data";
      state.user = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateToken, logout } = usersSlice.actions;

export default usersSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
