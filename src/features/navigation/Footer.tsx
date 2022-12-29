import * as React from "react";
import ICONS from "./icons";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

import Typography from "@mui/material/Typography";

export default function Footer() {
  const footerStyles: SxProps<Theme> = {
    position: "absolute",
    marginTop: "auto",
    bottom: 0,
    width: "100%",
    left: 0,
  };

  const containerStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <Box sx={footerStyles} component="footer" justifyContent={"center"}>
      <Container maxWidth="xl" sx={containerStyles}>
        <Typography>Built by Preston ✌🏽</Typography>
        <Stack direction={"row"} columnGap={2}>
          <IconButton
            size="small"
            href="https://twitter.com/saintprestonn"
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            target={"_blank"}
          >
            {ICONS.TWITTER}
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            href="https://github.com/Saintpreston/nyc-data"
            target='_blank'
          >
            {ICONS.GITHUB}
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
