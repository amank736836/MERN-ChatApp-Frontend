import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api.js";
import authSlice from "./reducers/auth.reducer.js";
import chatSlice from "./reducers/chat.reducer.js";
import miscSlice from "./reducers/misc.reducer.js";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

export default store;
