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
import { changeTheme, selectMode } from "./themeSlice";
import { changeRoute, selectTab } from "./routeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const NavBar = () => {
  const dispatch = useAppDispatch();

 
  const isDarkPreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const tab = useAppSelector(selectTab);
  const mode = useAppSelector(selectMode);

  // const LinkBehavior = React.forwardRef((props, ref) => (
  //   <RouterLink ref={ref} to="/" {...props} role={undefined} />
  // ));

  const handleThemeChange = (e: any) => {
    const { value } = e.target;
    if (value === "os default") {
      dispatch(changeTheme(isDarkPreferred ? "dark" : "light"));
    } else {
      dispatch(changeTheme(value as PaletteMode));
    }
  };
  const handleViewChange = (e: React.SyntheticEvent, val: string) => {
    /* render route or map component */

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
                <Tab value="map" label="Map" {...a11yProps(1)} />
                <Tab value="dashboard" label="Dashboard" {...a11yProps(0)} />
              </Tabs>
            </Grid>
            <Grid item>
              <Select
                size="small"
                value={mode}
                label="Theme"
                variant="standard"
                name="map-data-options"
                id="map-data-options"
                onChange={handleThemeChange}
              >
                <MenuItem value="light"> Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="os default">OS Default</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
