import axios from "axios";
import {CityDataAPI} from "./cityDataSlice"

async function getSchoolData() {
  const URL_HIGHSCHOLS = "https://data.cityofnewyork.us/resource/23z9-6uk9.json";

  try {
    const response = await axios.get(URL_HIGHSCHOLS);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getMentalHealthData() {
  const URL = "https://data.ny.gov/resource/6nvr-tbv8.json";
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getArrestsData() {
  const URL = "https://data.cityofnewyork.us/resource/uip8-fykc.json";
  try {
    const response = await axios.get(URL);
    const data = await response.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};

async function getShootingsData(){
const URL = "https://data.cityofnewyork.us/resource/5ucz-vwe8.json"
try {
  const response = await axios.get(URL);
  const data = await response.data;

  return data;
} catch (err) {
  console.log(err);
}
}


export async function getAllData(): Promise<CityDataAPI> {
  const arrestData = await getArrestsData();
  const mentalHealthData = await getMentalHealthData();
  const schoolData = await getSchoolData();
  const shootingsData = await getShootingsData();
  return {
    arrests: arrestData,
    mentalHealth: mentalHealthData,
    schools: schoolData,
    shootings: shootingsData
  };
}
