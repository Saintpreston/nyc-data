import React from "react";
import { selectOptions, filterMap, MapFilter } from "./mapSlice";
import { useAppSelector,useAppDispatch } from "../../app/hooks";

const MapDropDown = () => {

  const dataOptions = useAppSelector(selectOptions);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const { value  } = e.currentTarget;

    dispatch(filterMap(value as MapFilter));
  }
  return (
    <div>
      <label htmlFor="map-data-options">View:</label>
      <select name="map-data-options" id="map-data-options" onChange={handleChange}>
        {dataOptions.map(el => <option  key={el} value={el}> {el} </option>  )}
      </select>
    </div>
  );
};


export default MapDropDown;
