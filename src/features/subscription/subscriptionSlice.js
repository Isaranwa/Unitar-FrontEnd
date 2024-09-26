import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    currentSubscriptionDetail: null,
  },
  reducers: {
    setCurrentSubscriptionDetail: (state, action) => {
      const { currentSubscriptionDetail } = action.payload;
      state.currentSubscriptionDetail = currentSubscriptionDetail;
    },
  },
});

export const { setCurrentSubscriptionDetail } = subscriptionSlice.actions;
export const selectCurrentSubscriptionDetail = (state) =>
  state?.subscription?.currentSubscriptionDetail;
export default subscriptionSlice.reducer;
