import { teal } from "@mui/material/colors";
import { PaletteMode, PaletteOptions, Components, Theme } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type InclusivePaletteMode = PaletteMode | "os default";

const initialState: {
  mode: PaletteMode;
} = { mode: "light" };

const darkPalette: PaletteOptions = {
  primary: {
    main: teal[500],
  },
  secondary: {
    main: "#f50057",
  },
  background: {
    default: "#101010",
    paper: "#202020",
  },
};

const lightPalette: PaletteOptions = {
  primary: {
    main: teal[500],
    contrastText: "#FFFFFF",
  },
};

export const getDesignTokens = (mode: PaletteMode) : Theme => ({
  palette: {
    mode,
    ...(mode === "dark" ? darkPalette : lightPalette),
  },
  typography: {
    body1: {
      lineHeight: 2,
    },
  },
  components: {
    MuiContainer: {},
    MuiTabs: {
      defaultProps: {
        
        TabIndicatorProps: {
          sx: {
            backgroundColor:  mode === "dark" ? "primary" : "white",
          },
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: mode === "dark" ? "primary" : "white",
          },
        },
      },
    },
    MuiAppBar: {},
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        
      },
      styleOverrides: {
        root: {
          border: "solid",
          borderWidth: "2px",
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {},
      },
    },
  },
});

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const selectMode = (state: RootState) => state.theme.mode;
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
