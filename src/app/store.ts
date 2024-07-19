import {configureStore} from '@reduxjs/toolkit';
import {searchReducer} from "../containers/searchSlice.ts";
import {showReducer} from "../containers/showSlice.ts";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    show: showReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;