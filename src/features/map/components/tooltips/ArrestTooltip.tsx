import React, { MutableRefObject } from "react";
import Tooltip from "./Tooltip";
import { Arrest } from "../../../cityData/cityDataSlice";
import { Typography } from "@mui/material";

interface IProps {
  arrest: Arrest;
  toolTipPos: { current: { x: number; y: number } };
  markerRef: MutableRefObject<HTMLDivElement>;
  isHovered: boolean;
}

const _ArrestTooltip = React.forwardRef<MutableRefObject<HTMLDivElement>,  IProps>((props, ref) => {
  const { arrest, toolTipPos,  isHovered } = props;

  const arrestDate = new Date(arrest.arrest_date);
  const renderArrestDate = arrestDate.toLocaleDateString("en-US");

  const normalizeString = (str: string) => {
    return str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase();
  };
  const offense = normalizeString(arrest.ofns_desc);

  return (
    <Tooltip ref={ref} toolTipPos={toolTipPos} isHovered={isHovered}>
      <Typography>Arrest</Typography>
      <Typography fontWeight={400} lineHeight={1.2}>
        {renderArrestDate}
      </Typography>
      <Typography fontWeight={400} lineHeight={1.2}>
        Offense: {offense ?? "Classified"}
      </Typography>
    </Tooltip>
  );
});

const ArrestTooltip = React.memo(_ArrestTooltip);

export { ArrestTooltip };
