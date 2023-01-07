import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { getAllData } from "./fetchData";


export interface Arrest {
  latitude: string;
  longitude: string;
  arrest_date: string;
  arrest_key: string;
  geocoded_column: {
    coordinaates: number[];
    type: string;
  };
  ofns_desc: string;
  pd_desc: string;
}


export interface Shooting {
  latitude?: string;
  longitude?: string;
  boro: string;
  occur_date: string;
  occur_time: string;
  incident_key: string;
  vic_age_group: string,
}

export interface Budget {
  latitude?: string;
  longitude?: string;
  boro: string;
  occur_date: string;
  occur_time: string;
  incident_key: string;
}




export interface CityDataAPI {
  shootings: [] |  Shooting[];
  arrests: [] | Arrest[];
  budget: {} | Budget;
  totalPopulation?: number;
  demographicsAsPercent?: {
    asian: number;
    black: number;
    white: number;
    twoOrMore:number;
    other: number;
    nativeAmerican: number;
  }
}
interface CityDataState extends CityDataAPI {
  mapStatus: "idle" | "loading" | "failed" | "complete";
  error: string;
}
/* White: 41.33%
Black or African American: 23.82%
Other race: 14.43%
Asian: 14.29%
Two or more races: 5.63%
Native American: 0.44% */


const initialState: CityDataState = {
  mapStatus: "idle",
  shootings: [],
  arrests: [],
  budget: {},
  error: "",
  totalPopulation: 8_500_000,
  demographicsAsPercent : {
    asian: 15,
    black: 23,
    twoOrMore: 6,
    nativeAmerican: 0.5,
    other: 12,
    white: 41
  }

};

export const fetchData = createAsyncThunk("cityData/fetchData", getAllData);

export const cityDataSlice = createSlice({
  name: "cityData",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.mapStatus = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action ) => {
        state.mapStatus = "complete";
        const {arrests,  shootings, budget} = action.payload;
        state.arrests = arrests;
        state.shootings = shootings;
        state.budget = budget;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.mapStatus = "failed";
      });
  },
});


export const selectDemographics = (state: RootState) => state.cityData.demographicsAsPercent
export const selectStatus = (state: RootState) => state.cityData.mapStatus;
export const selectTotalPopulation = (state: RootState) => state.cityData.totalPopulation
export const selectArrests = (state: RootState) => state.cityData.arrests;
export const selectBudget = (state: RootState) => state.cityData.budget;
export const selectShootings = (state: RootState) => state.cityData.shootings;
export default cityDataSlice.reducer;
