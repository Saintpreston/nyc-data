import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const RedDotMarker = styled(Box)(({ theme, ...props }) => ({
  borderRadius: "50%",
  backgroundColor: "red",
  width: 12,
  height: 12,
  border: "solid 1px red",
  overflow: "hidden",
  transition: "all 150ms",
  cursor: 'pointer',
  "&:hover": {
    transform: "scale(1.6, 1.6)",
    backgroundColor: "rgba(120,0,0,0.2)",
  },
}));

export default RedDotMarker;
