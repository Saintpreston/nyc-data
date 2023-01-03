import Box from "@mui/material/Box";
import React from "react";
import Portal from "../Portal";

interface IProps {
  toolTipPos: { current: { x: number; y: number } };
  children: React.ReactElement[];
  handleHover: () => void;
}

export default function Tooltip(props: IProps) {
  const { children, toolTipPos, handleHover } = props;

  return (
    <Portal>
      <Box
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        sx={{
          top: `${toolTipPos.current.y}px`,
          left: `${toolTipPos.current.x}px`,
          position: "fixed",
          zIndex: 9999,
          padding: 1,
          borderRadius: "12px",
          width: "160px",
          height: "160px",
          backgroundColor: "rgba(250,190,200,0.6)",
          display: "flex",
          overflowWrap: "anywhere",
          flexDirection: "column",
          justifyContent: "center",
          backdropFilter: "blur(4px) grayscale(0.8)",
          border: "solid 1px white",
          boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.3)'
        }}
      >
        {children}
      </Box>
    </Portal>
  );
}
