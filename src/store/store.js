import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "../features/user/userSlice";
import participantSlice from "../features/participant/participantSlice";
import hackathonSlice from "../features/hackathon/hackathonSlice";
import organizerSlice from "../features/organizer/organizerSlice";
import subscriptionSlice from "../features/subscription/subscriptionSlice";
const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  // your apps' top-level reducers
  user: userSlice,
  participant: participantSlice,
  organizer: organizerSlice,
  hackathon: hackathonSlice,
  subscription: subscriptionSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
