import { configureStore } from "@reduxjs/toolkit";
import newVideoReducer from "./newVideoReducer";
import uperReducer from "./uperReducer";

export const store = configureStore({
  reducer: { newVideo: newVideoReducer, uper: uperReducer },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
