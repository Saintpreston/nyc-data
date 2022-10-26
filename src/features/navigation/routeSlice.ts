import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
 tab: "map" //change to dashboard once built
}


export const routeSlice = createSlice({
  name: "route",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeRoute: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
  }}
});


export const selectTab = (state: RootState) => state.route.tab
export const { changeRoute } = routeSlice.actions;
export default routeSlice.reducer;
