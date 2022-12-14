import axios from "axios";

import {
  CityDataAPI,
  School,
  Arrest,
  Shooting,
  MentalHealthFacility,
} from "./cityDataSlice";

async function getSchoolData() {
  const URL_HIGHSCHOLS =
    "https://data.cityofnewyork.us/resource/23z9-6uk9.json";

  try {
    const response = await axios.get(URL_HIGHSCHOLS);
    const data: School[] = await response.data;
    const result: School[] = [];

    for (let index = 0; index < data.length; index++) {
      const curr = data[index];
      const { latitude, longitude, dbn, school_name } = curr;
      result.push({ latitude, longitude, dbn, school_name });
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}




async function getMentalHealthData() {
  const URL = "https://data.ny.gov/resource/6nvr-tbv8.json";
  try {
    const response = await axios.get(URL);
    const data: Array<MentalHealthFacility> = await response.data;
    const result:Array<MentalHealthFacility> = []

    for (let index = 0; index < data.length; index++) {
      const curr = data[index];
      const {georeference, facility_name, populations_served} = curr;
      result.push({georeference, facility_name, populations_served})
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getArrestsData() {
  const URL = "https://data.cityofnewyork.us/resource/uip8-fykc.json";
  try {
    const response = await axios.get(URL);
    const data: Array<Arrest> = await response.data;
    const result: Array<Arrest> = [];

    for (let index = 0; index < data.length; index++) {
      const curr = data[index];

      const {
        latitude,
        longitude,
        arrest_date,
        arrest_key,
        geocoded_column,
        ofns_desc,
        pd_desc,
      } = curr;
      result.push({
        latitude,
        longitude,
        arrest_date,
        arrest_key,
        geocoded_column,
        ofns_desc,
        pd_desc,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getShootingsData() {
  const URL = "https://data.cityofnewyork.us/resource/5ucz-vwe8.json";
  try {
    const response = await axios.get(URL);
    const data: Array<Shooting> = await response.data;
    const result: Array<Shooting> = [];

    for (let index = 0; index < data.length; index++) {
      const curr = data[index];
      const {
        latitude,
        longitude,
        boro,
        occur_date,
        occur_time,
        incident_key,
      } = curr;
      result.push({
        latitude,
        longitude,
        boro,
        occur_date,
        occur_time,
        incident_key,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getBudgetData() {
 

  //TODO: Paginate this request, fetching 580,000 in one go is not optimal
  //  "https://data.cityofnewyork.us/resource/mwzb-yiwb.json?$limit=580000";
  console.time('budgetfetch')

  const URL =
    "https://data.cityofnewyork.us/resource/mwzb-yiwb.json?";
  try {
    const response = await axios.get(URL);
    const data: Array<any> = await response.data;
    const result: any = {};

    for (let index = 0; index < data.length; index++) {
      const curr = data[index];
      let department = curr.agency_name;
      const budget = parseInt(curr.current_modified_budget_amount);

      if (department.includes("COMMUNITY BOARD")) {
        if (department.includes("BRONX")) {
          department = "BRONX COMMUNITY BOARD";
        }
        if (department.includes("MANHATTAN")) {
          department = "MANHATTAN COMMUNITY BOARD";
        }
        if (department.includes("QUEENS")) {
          department = "QUEENS COMMUNITY BOARD";
        }
        if (department.includes("BROOKLYN")) {
          department = "BROOKLYN COMMUNITY BOARD";
        }
        if (department.includes("STATEN ISLAND")) {
          department = "STATEN ISLAND COMMUNITY BOARD";
        }
      }

      if (result[department] === undefined) {
        result[department] = 0;
      } else {
        result[department] += budget;
      }
    }
    console.timeEnd('budgetfetch')
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}



export async function getAllData(): Promise<CityDataAPI> {
  
  const arrestData = await getArrestsData();
  const mentalHealthData = await getMentalHealthData();
  const schoolData = await getSchoolData();
  const shootingsData = await getShootingsData();
  const budgetData = await getBudgetData();

  return {
    arrests: arrestData,
    mentalHealth: mentalHealthData,
    schools: schoolData,
    shootings: shootingsData,
    budget: budgetData
  };
}
