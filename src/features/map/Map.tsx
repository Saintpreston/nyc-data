import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchData,
  selectArrests,
  selectMentalHealth,
  selectStatus,
  selectSchools,
  selectShootings,
} from "../cityData/cityDataSlice";
import MapDropDown from "./MapFilters";
import { selectFilter, selectDateFilter, selectCenter } from "./mapSlice";
import { Paper, CircularProgress, Container, Stack } from "@mui/material";


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



  return (
    <Container maxWidth="xl">
      {!isLoaded || status === "loading" ? (
        <Stack sx={{ width: "100%" }}>
          <CircularProgress
            size="5vw"
            thickness={1.5}
            sx={{ margin: "auto" }}
          />
        </Stack>
      ) : (
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            height: "85vh",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "lightgray",
            borderRadius: 1,
          }}
        >
          <MapDropDown />
          <Map />
        </Paper>
      )}
    </Container>
  );
}

const Map = () => {
  const mentalHealth = useAppSelector(selectMentalHealth);
  const arrests = useAppSelector(selectArrests);
  const status = useAppSelector(selectStatus);
  const mapFilter = useAppSelector(selectFilter);
  const schools = useAppSelector(selectSchools);
  const shootings = useAppSelector(selectShootings);
  const dateFilter = useAppSelector(selectDateFilter);
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

    //api isnt updated daily -> see https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc

    function renderArrest() {
      const lastUpdate = new Date("September 1, 2022");
      const arrestsByDate = arrests.filter((el) => {
        const arrestDate = new Date(el.arrest_date);

        const diffTime = Math.abs(lastUpdate.getTime() - arrestDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case "1 month":
            return diffDays <= 31;
          case "3 months":
            return diffDays <= 93;
          case "6 months":
            return diffDays <= 190;
          default:
            return el !== undefined;
        }
      });

      return arrestsByDate.map((arr) => {
        const lat = parseFloat(arr.latitude);
        const lng = parseFloat(arr.longitude);

        return (
          <Marker key={arr.arrest_key} position={{ lat: lat, lng: lng }} />
        );
      });
    }

    function renderMentalHealth() {
      const renderable = mentalHealth.filter(
        (el) => el.georeference !== undefined
      );
      /* 
      api  included the property even when it's undefined so Object.hasOwn() didnt work  :)
       */

      const renderMarkers = renderable.map((el, i) => {
        const lng = el.georeference.coordinates[0];
        const lat = el.georeference.coordinates[1];

        return <Marker key={i} position={{ lat: lat, lng: lng }} />;
      });

      return renderMarkers;
    }
    function renderSchools() {
      return schools.map((arr) => {
        const lat = parseFloat(arr.latitude);
        const lng = parseFloat(arr.longitude);

        return <Marker key={arr.dbn} position={{ lat: lat, lng: lng }} />;
      });
    }
    function renderShootings() {
      const renderable = shootings.filter(
        (el) => Object.hasOwn(el, "latitude") && Object.hasOwn(el, "longitude")
      );
      const lastUpdate = new Date("June 9, 2022");

      const filteredByDate = renderable.filter((el) => {
        const shootingDate = new Date(el.occur_date);

        const diffTime = Math.abs(
          lastUpdate.getTime() - shootingDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case "1 month":
            return diffDays <= 31;
          case "3 months":
            return diffDays <= 93;
          case "6 months":
            return diffDays <= 190;
          default:
            return el !== undefined;
        }
      });

      const renderMarkers = filteredByDate.map((arr, i) => {
        const lat = parseFloat(arr.latitude!);
        const lng = parseFloat(arr.longitude!);

        return (
          <Marker
            key={arr.incident_key + "index:" + i}
            position={{ lat: lat, lng: lng }}
          />
        );
      });
      return renderMarkers;
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
      case "All":
       return [renderSchools(),renderShootings(),renderMentalHealth(),renderArrest()]
      default:
        break
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
        disableDefaultUI: true,
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
