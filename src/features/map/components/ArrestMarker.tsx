// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from "react";
import { useState, useRef } from "react";
import { Arrest } from "../../cityData/cityDataSlice";
import { InfoBox } from "@react-google-maps/api";
import RedDotMarker from "./RedDotMarker";
import { ArrestTooltip } from "./tooltips/ArrestTooltip";

interface IProps {
  arrest: Arrest;
}

const getPoint = (el: HTMLDivElement, tooltip: HTMLDivElement) => {
  const pt = { x: 0, y: 0 };
  const elRect = el.getBoundingClientRect();

  pt.y = elRect.top - 12 - 160;
  pt.x = elRect.left + (el.offsetWidth - 160) / 2;

  return pt;
};

function Marker({ arrest }: IProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  const position = {
    lat: Number(arrest.latitude),
    lng: Number(arrest.longitude),
  } as google.maps.LatLngLiteral;

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
    <InfoBox position={position} options={infoBoxOptions}>
      <>
        {isHovered && (
          <ArrestTooltip toolTipPos={posRef}  arrest={arrest} handleHover={handleHover} />
        )}
        <RedDotMarker onMouseLeave={handleHover} onMouseEnter={handleHover} />
      </>
    </InfoBox>
  );
}

export default Marker;
