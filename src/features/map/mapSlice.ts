import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export type MapFilter =
  | "All"
  | "Shootings"
  | "Arrests"

export type MapDateFilter =
  | "All"
  | "1 month"
  | "3 months"
  | "6 months";


interface GoogleMap {
 status: "loading" | "idle"
 center: google.maps.LatLngLiteral;
 filter: MapFilter;
 viewOptions: MapFilter[];
 dateFilter: MapDateFilter;
 dateOptions: MapDateFilter[];
}



const initialState: GoogleMap = {
  status: "idle",
 center: {
  lat: 40.73364,
  lng: -73.98142,
},
viewOptions: [
 "All",
 "Shootings",
 "Arrests",
],
  filter: "All",
  dateFilter: "All",
  dateOptions: ["All", "1 month", "3 months", "6 months"]
};


export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    filterMap: (state, action: PayloadAction<MapFilter>) => {
      state.filter = action.payload;
    },
    filterMapByDate: (state, action: PayloadAction<MapDateFilter>) =>{
      state.dateFilter = action.payload;
    }
  },


});


export const { filterMap, filterMapByDate } = mapSlice.actions;
export const selectFilter = (state: RootState) => state.map.filter;
export const selectDateFilter = (state: RootState) => state.map.dateFilter;
export const selectCenter = (state: RootState) => state.map.center;
export const selectStatus = (state: RootState) => state.map.status;
export const selectOptions = (state: RootState) => state.map.viewOptions;
export const selectDateOptions = (state: RootState) => state.map.dateOptions;

export default mapSlice.reducer;
