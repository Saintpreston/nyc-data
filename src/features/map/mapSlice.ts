import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export type MapFilter =
  | "All"
  | "Shootings"
  | "Arrests"
  | "Mental Health Facilities"
  | "Schools";


interface GoogleMap {
 status: "loading" | "idle"
 center: google.maps.LatLngLiteral;
 filter: MapFilter;
 options: MapFilter[]
}



const initialState: GoogleMap = {
  status: "idle",
 center: {
  lat: 40.73364,
  lng: -73.98142,
},
options: [
 "All",
 "Shootings",
 "Arrests",
 "Mental Health Facilities",
 "Schools",
],
  filter: "All",
};


export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    filterMap: (state, action: PayloadAction<MapFilter>) => {
      state.filter = action.payload;
    },
    updateCenter: (state, action: PayloadAction<google.maps.LatLngLiteral>) =>{
     state.center = action.payload;
    }
  },


});


export const { filterMap, updateCenter } = mapSlice.actions;
export const selectFilter = (state: RootState) => state.map.filter;
export const selectCenter = (state: RootState) => state.map.center;
export const selectStatus = (state: RootState) => state.map.status;
export const selectOptions = (state: RootState) => state.map.options;

export default mapSlice.reducer;
