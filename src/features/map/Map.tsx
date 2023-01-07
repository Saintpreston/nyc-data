import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchData,
  selectArrests,
  selectStatus,
  selectShootings,
} from "../cityData/cityDataSlice";
import MapDropDown from "./MapFilters";
import { selectFilter, selectDateFilter, selectCenter } from "./mapSlice";
import {
  Paper,
  CircularProgress,
  Container,
  Stack,
  useTheme,
  Typography,
} from "@mui/material";
import ArrestMarker from "./components/markers/ArrestMarker";
import ShootingMarker from "./components/markers/ShootingMarker";

function MapWrapper() {
  const theme = useTheme();

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

  const containerStyles = {
    border: `solid 2px ${theme.palette.mode === "dark" ? "none" : "gainsboro"}`,
    borderRadius: 2,
    boxShadow: "0px 4px 8px 0px rgba(43,43,43,0.2)",
    overflow: "hidden",
    height: "85vh",
  };

  return (
    <Container maxWidth="xl">
      {!isLoaded || status === "loading" ? (
        <Stack sx={{ width: "100%" }} direction="column">
          <CircularProgress
            size="5vw"
            thickness={1.5}
            sx={{ margin: "auto", my: 4 }}
          />
          <Typography textAlign={"center"}>
            Working on the loading, sorry!😅
          </Typography>
        </Stack>
      ) : (
        <Paper elevation={0} sx={containerStyles}>
          <MapDropDown />
          <Map />
        </Paper>
      )}
    </Container>
  );
}

const Map = () => {
  const arrests = useAppSelector(selectArrests);
  const status = useAppSelector(selectStatus);
  const mapFilter = useAppSelector(selectFilter);
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
        return (
          <ArrestMarker key={arr.arrest_key} arrest={arr}  />
        );
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

      const renderMarkers = filteredByDate.map((arr) => {
     

        return (
          <ShootingMarker shooting={arr}
          />
        );
      });
      return renderMarkers;
    }

    switch (mapFilter) {
      case "Arrests":
        return renderArrest();
      case "Shootings":
        return renderShootings();
      case "All":
        return [
          renderShootings(),
          renderArrest(),
        ];
      default:
        break;
    }
  };
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };
  const [currBounds, setCurrBounds] = useState<undefined | string>();

  // const handleBoundsChange = () => {
  //   setCurrBounds(
  //     JSON.stringify(mapRef?.getBounds())
  //   ); /* json.stringify is performing some magic here because if i console.log(), it looks completely diff */
  //   //   console.log(mapRef);
  // };

  const nycWidePanBounds = {
    south: 40.45026661243767,
    west: -74.36470970116127,
    north: 40.99200251835952,
    east: -73.38006004295815,
  };



 

  return (
    <GoogleMap
      // onBoundsChanged={handleBoundsChange}
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
