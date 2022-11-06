import * as React from "react";
import { useState } from "react";
import Map from "./features/map/Map";
import NavBar from "./features/navigation/NavBar";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { getDesignTokens, selectMode } from "./features/navigation/themeSlice";
import { createTheme, CssBaseline } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectTab as selectRoute } from "./features/navigation/routeSlice";
import Dashboard from "./features/dashboard/Dashboard";
import Welcome from "./features/welcome/Welcome";
import "./index.css";

function App() {
  const mode = useAppSelector(selectMode);
  const theme = createTheme(getDesignTokens(mode));
  const route = useAppSelector(selectRoute);

  const [isOnboarded, setIsOnboarded] = useState(false);



  return (
    <div className="App">
     

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isOnboarded ? (
        <>
          <NavBar />
          {route === "map" && <Map />}
          {route === "dashboard" && <Dashboard />}
        </>
      ) : (
        <Welcome isOnboarded={isOnboarded}  setIsOnboarded={setIsOnboarded} />
      )}
      </ThemeProvider>
    </div>
  );
}

export default App;
