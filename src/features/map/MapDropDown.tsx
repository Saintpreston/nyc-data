import React from "react";
import { selectOptions, filterMap, MapFilter, selectFilter } from "./mapSlice";
import { useAppSelector,useAppDispatch } from "../../app/hooks";
import { FormControl, Select, MenuItem } from "@mui/material";


const MapDropDown = () => {

  const dataOptions = useAppSelector(selectOptions);
  const currFilter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) =>{
    
    const { value  } = e.target;

    dispatch(filterMap(value as MapFilter));
  }
  return (
    <FormControl sx={{padding:2}} >
     
      <Select  variant='standard' value={currFilter}  name="map-data-options" id="map-data-options" onChange={handleChange}>
        {dataOptions.map(el => <MenuItem  key={el} value={el}> {el} </MenuItem>  )}
      </Select>
    </FormControl>
  );
};


export default MapDropDown;
