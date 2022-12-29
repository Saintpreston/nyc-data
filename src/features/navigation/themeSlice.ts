import { teal } from "@mui/material/colors";
import { PaletteMode, PaletteOptions } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type InclusivePaletteMode = PaletteMode | "OS Default";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const preferredTheme = isDarkMode ? "dark" : "light";



const initialState: {
  mode: PaletteMode;
} = { mode: preferredTheme };
console.log(initialState);

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

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "dark" ? darkPalette : lightPalette),
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 2,
      fontWeight: 550,
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiContainer: {},
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          sx: {
            backgroundColor: mode === "dark" ? "primary" : "white",
          },
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
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
      defaultProps: {},
      styleOverrides: {
        root: {
          border: "solid",
          borderWidth: "2px",
          borderRadius: "8px",
        },
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          "&:hover": {
            boxShadow: "0px 4px 20px 0px rgba(43,43,43,0.5)",
            backgroundColor: "transparent",
            color: teal[500],
            outline: `solid 2px ${teal[500]}`,
          },
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
          borderTop: "solid 1px gainsboro",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          border: "none",
        },
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
