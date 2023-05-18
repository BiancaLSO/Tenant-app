import { configureStore } from "@reduxjs/toolkit";
import infoReducer from "./redux/info/infoSlice";
import usersReducer from "./redux/users/usersSlice";
import categoryReducer from "./redux/category/categorySlice";
import issueReducer from "./redux/issue/issueSlice";

export const store = configureStore({
  reducer: {
    info: infoReducer,
    users: usersReducer,
    category: categoryReducer,
    issue: issueReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
