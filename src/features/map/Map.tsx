import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

async function getSchoolData() {
  const URL = "https://data.cityofnewyork.us/resource/uq7m-95z8.json";
  const data = await fetch(URL);
  const jsonData = await data.json();
  console.log("School data", jsonData);
}

async function getMentalHealthData() {
  const URL = "https://data.ny.gov/resource/6nvr-tbv8.json";
  const data = await fetch(URL);
  const jsonData = await data.json();
  console.log("Mental Health data", jsonData);
}

function MapWrapper() {
  const API_KEY: string = process.env.REACT_APP_GOOGLE_MAPS_KEY!;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  return isLoaded === false ? <div>Loading...</div> : <Map />;
}

const Map = () => {
  
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

  const [arrests, setArrests] = React.useState<[] | Array<Arrest>>([]);

  React.useEffect(() => {
    if (arrests.length !== 0) return;
    async function getArrestsData() {
      try {
        const URL = "https://data.cityofnewyork.us/resource/uip8-fykc.json";
        const data = await fetch(URL);
        const jsonData = await data.json();
        setArrests(jsonData);
      } catch (err) {
        console.log(err);
      }
    }
    getArrestsData();
  }, [arrests]);

  const center = React.useMemo(() => ({ lat: 44, lng: -80 }), []);

  const renderCrimes = () => {
    if (!arrests.length) return;
    console.log(arrests);
    return arrests.map((arr: Arrest) => {
      const lat: number = parseFloat(arr.latitude);
      const lng: number = parseFloat(arr.longitude);

      return <Marker key={arr.arrest_key} position={{ lat: lat, lng: lng }} />;
    });
  };

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{
        width: "80%",
        height: "100vh",
      }}
    >
      {renderCrimes()}
    </GoogleMap>
  );
};

export default MapWrapper;
