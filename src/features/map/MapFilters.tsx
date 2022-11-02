import React from "react";
import {
  selectOptions,
  filterMap,
  MapFilter,
  selectFilter,
  selectDateFilter,
  selectDateOptions,
  MapDateFilter,
  filterMapByDate,
} from "./mapSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";

const MapDropDown = () => {
  const viewOptions = useAppSelector(selectOptions);
  const currFilter = useAppSelector(selectFilter);
  const dateFilter = useAppSelector(selectDateFilter);
  const dateOptions = useAppSelector(selectDateOptions);
  const dispatch = useAppDispatch();

  const handleFilterChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    dispatch(filterMap(value as MapFilter));
  };

  const isTimeDisabled = currFilter === "All" || currFilter==="Mental Health Facilities" || currFilter === "Schools"

  const handleDateChange = (
    e: SelectChangeEvent) => {
    const { value } = e.target;
    dispatch(filterMapByDate(value as MapDateFilter));
  };

  return (
    <>
      <Box sx={{ mx: 2, my: 1.5, width: "50%", display: "flex", gap: 6 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-select-small" htmlFor="map-view-options">
            View:
          </InputLabel>
          <Select
            value={currFilter}
            name="map-view-options"
            id="map-view-options"
            onChange={handleFilterChange}
            labelId="demo-select-small"
            label="View:"
          >
            {viewOptions.map((el : MapFilter) => (
              <MenuItem key={el} value={el}>
                {" "}
                {el}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id="demo-select-small" htmlFor="map-view-options">
            Time:
          </InputLabel>
          <Select
            disabled={isTimeDisabled}
            value={dateFilter}
            name="map-view-options"
            id="map-view-options"
            onChange={handleDateChange}
            labelId="demo-select-small"
            label="Time:"
          >
            {dateOptions.map((el) => (
              <MenuItem key={el} value={el}>
                {" "}
                {el}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>

    /* <Select
        sx={{ width: "20%",mx:2 }}
        value={currFilter}
        name="map-data-options"
        // id="map-data-options"
        onChange={handleFilterChange}
      >
        {viewOptions.map((el) => (
          <MenuItem key={el} value={el}>
            {" "}
            {el}{" "}
          </MenuItem>
        ))}
      </Select> */

    /* <ToggleButtonGroup size="small" aria-label="outlined button group" value={dateFilter} onChange={handleDateChange} exclusive>
        <ToggleButton value="1 month"  >1 Month</ToggleButton>
        <ToggleButton value="3 months" >3 Months</ToggleButton>
        <ToggleButton value="6 months" > 6 Months</ToggleButton>
      </ToggleButtonGroup> */
  );
};

export default MapDropDown;
