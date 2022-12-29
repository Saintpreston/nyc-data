import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  useMediaQuery,
  Select,
  MenuItem,
  PaletteMode,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { changeTheme, InclusivePaletteMode } from "./themeSlice";
import { changeRoute, selectTab } from "./routeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SelectChangeEvent } from "@mui/material";
import { useState, useEffect } from "react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const SYSTEM_THEME = "OS Default";

  const preferredTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const tab = useAppSelector(selectTab);

  const [selectedTheme, setSelectedTheme] =
    useState<InclusivePaletteMode>(SYSTEM_THEME);

  useEffect(() => {
    function handleOSThemeChange() {
      if (selectedTheme === SYSTEM_THEME) {
        dispatch(changeTheme(preferredTheme === "dark" ? "light" : "dark"));
      }
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleOSThemeChange);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleOSThemeChange);
  }, [dispatch, preferredTheme, selectedTheme]);

  const handleThemeChange = (e: SelectChangeEvent<InclusivePaletteMode>) => {
    setSelectedTheme(SYSTEM_THEME);
    dispatch(changeTheme(preferredTheme));

    const { value } = e.target;
    if (value === SYSTEM_THEME) {
      setSelectedTheme(SYSTEM_THEME);
      dispatch(changeTheme(preferredTheme));
    } else {
      dispatch(changeTheme(value as PaletteMode));
      setSelectedTheme(value as InclusivePaletteMode);
    }
  };

  const handleViewChange = (e: React.SyntheticEvent, val: string) => {
    dispatch(changeRoute(val));
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <AppBar>
      <Toolbar variant="dense">
        <Container maxWidth="xl">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Tabs
                value={tab}
                onChange={handleViewChange}
                aria-label="control view"
              >
                <Tab value="map" label="Map" {...a11yProps(0)} />
                <Tab value="dashboard" label="Dashboard" {...a11yProps(1)} />
              </Tabs>
            </Grid>
            <Grid item>
              <Select
                size="small"
                value={selectedTheme}
                label="Theme"
                variant="standard"
                name="map-data-options"
                id="map-data-options"
                onChange={handleThemeChange}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value={SYSTEM_THEME}>{SYSTEM_THEME}</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
