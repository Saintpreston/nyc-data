import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { getAllData } from "./fetchData";

 interface School {
  latitude: string;
  longitude: string;
  dbn: string;
  
}

interface Arrest {
  latitude: string;
  longitude: string;
  arrest_key: string;
  geocoded_column: {
    coordinaates: number[];
    type: string;
  };
  ofns_desc: string;
  pd_desc: string;
}

interface MentalHealthFacility {
  georeference: {
    coordinates: number[];
  };
  facility_name: string;
  populations_served: string;
}

interface Shooting {
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
  mentalHealth: [] | MentalHealthFacility[];
  schools: [] | School[];
}
interface CityDataState extends CityDataAPI {
  status: "idle" | "loading" | "failed" | "complete";
  error: string;
}


const initialState: CityDataState = {
  status: "idle",
  shootings: [],
  arrests: [],
  schools: [],
  mentalHealth: [],
  error: "",

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
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action ) => {
        state.status = "complete";
        const {arrests, mentalHealth, schools, shootings} = action.payload;
        state.arrests = arrests;
        state.mentalHealth = mentalHealth;
        state.schools = schools;
        state.shootings = shootings;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});



export const selectStatus = (state: RootState) => state.cityData.status;
export const selectMentalHealth = (state: RootState) =>
  state.cityData.mentalHealth;

export const selectArrests = (state: RootState) => state.cityData.arrests;
export const selectSchools = (state: RootState) => state.cityData.schools;
export const selectShooting = (state: RootState) => state.cityData.shootings;
export default cityDataSlice.reducer;
