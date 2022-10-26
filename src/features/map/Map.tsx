import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchData,
  selectArrests,
  selectMentalHealth,
  selectStatus,
  selectSchools,
  selectShooting,
} from "../cityData/cityDataSlice";
import MapDropDown from "./MapDropDown";
import { selectFilter, selectCenter } from "./mapSlice";
import { Paper } from "@mui/material";

function MapWrapper() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });
  const status = useAppSelector(selectStatus);

  if (loadError) {
    return (
      <div>
        {loadError.name}: {loadError.message}
      </div>
    );
  }
  return !isLoaded || status === "loading" ? (
    <div>Loading...</div>
  ) : (
    <Paper  sx={{overflow: 'hidden', width: "80vw", height: '80vh', margin:'auto', mt: 10, borderRadius: 2 }}>
      <MapDropDown />
      <Map />
    </Paper>
  );
}

const Map = () => {
  const mentalHealth = useAppSelector(selectMentalHealth);
  const arrests = useAppSelector(selectArrests);
  const status = useAppSelector(selectStatus);
  const mapFilter = useAppSelector(selectFilter);
  const schools = useAppSelector(selectSchools);
  const shootings = useAppSelector(selectShooting);

  const defaultCenter =
    useAppSelector(
      selectCenter
    ); /* for some reason, this doesnt reset the location of the map every rerender, look more into this */

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "complete") return;
    dispatch(fetchData());
  }, [dispatch, status]);

  const renderData = () => {
    if (status !== "complete") return;

    function renderArrest() {
      return arrests.map((arr) => {
        const lat = parseFloat(arr.latitude);
        const lng = parseFloat(arr.longitude);

        return (
          <Marker key={arr.arrest_key} position={{ lat: lat, lng: lng }} />
        );
      });
    }

    function renderMentalHealth() {
      const mentalHealthRenderable = mentalHealth.filter((el) =>
        Object.hasOwn(el, "georeference")
      );
      return mentalHealthRenderable.map((el, i) => {
        const lng = el.georeference.coordinates[0];
        const lat = el.georeference.coordinates[1];

        return <Marker key={i} position={{ lat: lat, lng: lng }} />;
      });
    }
    function renderSchools() {
      return schools.map((arr) => {
        const lat = parseFloat(arr.latitude);
        const lng = parseFloat(arr.longitude);

        return <Marker key={arr.dbn} position={{ lat: lat, lng: lng }} />;
      });
    }
    function renderShootings() {
      const renderable = shootings.filter((el) =>
        Object.hasOwn(el, "latitude")
      );
      console.log(renderable);
      return renderable.map((arr, i) => {
        const lat = parseFloat(arr.latitude!);
        const lng = parseFloat(arr.longitude!);

        return (
          <Marker
            key={arr.incident_key + "index:" + i}
            position={{ lat: lat, lng: lng }}
          />
        );
      });
    }

    switch (mapFilter) {
      case "Arrests":
        return renderArrest();
      case "Mental Health Facilities":
        return renderMentalHealth();
      case "Shootings":
        return renderShootings();
      case "Schools":
        return renderSchools();
      default:
        break;
    }
  };
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
    setCurrBounds(JSON.stringify(mapRef?.getBounds()));
  };
  const [currBounds, setCurrBounds] = useState<undefined | string>();

  const handleBoundsChange = () => {
    setCurrBounds(
      JSON.stringify(mapRef?.getBounds())
    ); /* json.stringify is performing some magic here because if i console.log(), it looks completely diff */
 //   console.log(mapRef);
  };

  const nycWidePanBounds = {
    south: 40.45026661243767,
    west: -74.36470970116127,
    north: 40.99200251835952,
    east: -73.38006004295815,
  };

  return (
    /* <p>{currBounds}</p> */

    <GoogleMap
      onBoundsChanged={handleBoundsChange}
      onLoad={handleOnLoad}
      zoom={15}
      center={defaultCenter}
      mapContainerStyle={{
        width: "100%",
        height: "95%",
      }}
      options={{
        restriction: {
          latLngBounds: nycWidePanBounds,
          strictBounds: true,
        },
      }}
    >
      {renderData()}
    </GoogleMap>
  );
};

export default MapWrapper;
