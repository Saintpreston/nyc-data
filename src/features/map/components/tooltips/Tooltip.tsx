import Box from "@mui/material/Box";
import { BoxProps } from "@mui/material/Box";
import React, { MutableRefObject, } from "react";
import Portal from "../Portal";

interface IProps extends BoxProps {
  toolTipPos: { current: { x: number; y: number } };
  children: React.ReactElement[];
  isHovered: boolean;
}

const Tooltip = React.forwardRef<MutableRefObject<HTMLDivElement>, IProps>(
  (props, ref) => {
    const { children, toolTipPos, isHovered } = props;

    

    return (
      <Portal>
        <Box
          ref={ref}
          sx={{
            top: `${toolTipPos.current.y}px`,
            left: `${toolTipPos.current.x}px`,
            position: "fixed",
            display: "flex",
            visibility: isHovered ? 'visible' : 'hidden',
            zIndex: 9999,
            padding: 1,
            borderRadius: "8px",
            backgroundColor: "#ffffff99",
            overflowWrap: "anywhere",
            flexDirection: "column",
            justifyContent: "center",
            backdropFilter: "blur(8px) grayscale(0.8)",
            border: "solid 1px white",
            boxShadow: "0px 2px 12px 1px rgba(0,0,0,0.3)",
          }}
        >
          {children}
        </Box>
      </Portal>
    );
  }
);
export default Tooltip;
