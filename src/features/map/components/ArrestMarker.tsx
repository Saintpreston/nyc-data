// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from "react";
import { useState, useRef } from "react";
import { Arrest } from "../../cityData/cityDataSlice";
import {  InfoBox } from "@react-google-maps/api";
import { Theme, SxProps, Box, Typography } from "@mui/material";
import Portal from "./Portal";
import RedDotMarker from "./RedDotMarker";



interface IProps {
  arrest: Arrest;
}

function ArrestMarker({ arrest }: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);


  const markerDotRef = useRef({x: 0, y: 0})

  const position = {
    lat: Number(arrest.latitude),
    lng: Number(arrest.longitude),
  } as google.maps.LatLngLiteral;

  // rgba(255, 41, 25, 0.4)



  const toolTipStyles: SxProps<Theme> = {
    top:  '0px',
    left: '0px',
    position: 'fixed',
    zIndex: 9999,
  };

  

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === "mouseenter") {
      setIsHovered(true);
    }
    if (event.type === "mouseleave") {
     
      setIsHovered(false);
    }
  };

  const infoBoxOptions : InfoBoxOptions = { closeBoxURL: "", enableEventPropagation: true, disableAutoPan: true, boxStyle: { width: 'fit-content', height: 'fit-content', overflow: 'visible'} };

  return (
    <InfoBox position={position} options={infoBoxOptions}>
      <>
        {isHovered && (<Portal>
          <Box sx={toolTipStyles}>
            <Typography fontSize={8}>Arrest</Typography>
            <Typography>Charged with {arrest.pd_desc}</Typography>
          </Box>
        </Portal>)}
        <RedDotMarker
          ref={markerDotRef}
          onMouseLeave={handleHover}
          onMouseEnter={handleHover}
        />
      </>
    </InfoBox>
  );
}

export default ArrestMarker;
