// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { Arrest } from "../../cityData/cityDataSlice";
import { InfoBox } from "@react-google-maps/api";
import RedDotMarker from "./RedDotMarker";
import { ArrestTooltip } from "./tooltips/ArrestTooltip";

interface IProps {
  arrest: Arrest;
}



function ArrestMarker({ arrest }: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  

  const position = {
    lat: Number(arrest.latitude),
    lng: Number(arrest.longitude),
  } as google.maps.LatLngLiteral;

  


  const getPoint = useCallback( (el: HTMLDivElement, tooltip: HTMLDivElement) => {
    const pt = { x: 0, y: 0 };
    const elRect = el.getBoundingClientRect();
    console.log(tooltip);
     const {offsetWidth, offsetHeight} = tooltip;
   
    pt.y = elRect.top - offsetHeight - 12;
    pt.x = elRect.left + (el.offsetWidth - offsetWidth) / 2;
  
    return pt;
  },[]);


  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type === "mouseenter") {
      posRef.current = getPoint(event.target, tooltipRef.current);
      
      setIsHovered(true);
    }
    if (event.type === "mouseleave") {
      setIsHovered(false);
    }
  };

  const infoBoxOptions = {
    closeBoxURL: "",
    enableEventPropagation: true,
    disableAutoPan: true,
    boxStyle: {
      width: "fit-content",
      height: "fit-content",
      overflow: "visible",
    },
  };

  return (
    <InfoBox  position={position} options={infoBoxOptions}>
      <>
        <ArrestTooltip
          toolTipPos={posRef}
          arrest={arrest}
          isHovered={isHovered}
          ref={tooltipRef}
        />

        <RedDotMarker onMouseLeave={handleHover} onMouseEnter={handleHover} />
      </>
    </InfoBox>
  );
}

export default ArrestMarker;
