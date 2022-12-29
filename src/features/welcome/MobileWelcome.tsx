import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import React from "react";

function MobileWelcome() {
  const theme = useTheme();

  const containerStyles = {
    py: 6,
    border: `solid 1px ${theme.palette.mode === "dark" ? "none" : "gainsboro"}`,
    backgroundColor: `${theme.palette.mode === "dark" ? "#1e1f21" : "none"}`,
    borderRadius: 2,
    boxShadow: "0px 4px 8px 0px rgba(43,43,43,0.1)",
  };

  return (
    <Container maxWidth="xs" sx={containerStyles}>
      <Box px={4} >
        <Typography gutterBottom variant="h4">
          Hello Visitor,
        </Typography>
        <Typography>
          It looks like you're coming in from a mobile device.
        </Typography>{" "}
        <Typography>
          I haven't had a chance to make sure the mobile UI is up to standard
          yet. Currently, busy with school, interning and other side projects,
          I'll get to it when I get to it. If you want to help me out, feel free
          to{" "}
          <Link
            target={"_blank"}
            href="https://github.com/Saintpreston/nyc-data/issues/11"
          >
            shoot me a Pull Request.
          </Link>
        </Typography>
        <Typography>
          Warmly, <br />
          Preston ✌🏽
        </Typography>
        <br />
        <Button
          sx={{
            fontWeight: 700
          }}
          disabled
          onClick={() => null}
          variant="contained"
          fullWidth
        >
          Launch Project
        </Button>
      </Box>
    </Container>
  );
}

export default MobileWelcome;

function setIsOnboarded(arg0: boolean) {
  throw new Error("Function not implemented.");
}
