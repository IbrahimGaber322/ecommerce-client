// Import necessary function from MUI for creating themes
import { createTheme } from "@mui/material/styles";

// Create a customized MUI dark theme
const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
    primary: {
      main: "#1976D2", // Main primary color
      contrastText: "#FFFFFF", // Contrast text color for primary elements
    },
    secondary: {
      main: "#F50057", // Main secondary color
      contrastText: "#FFFFFF", // Contrast text color for secondary elements
    },
    background: {
      default: "#121212", // Default background color
      paper: "#1E1E1E", // Background color for paper elements
    },
    success: {
      main: "#4CAF50", // Success color
      contrastText: "#fff", // Contrast text color for success elements
    },
    error: {
      main: "#FF5722", // Error color
      contrastText: "#fff", // Contrast text color for error elements
    },
    warning: {
      main: "#FFC107", // Warning color
      contrastText: "#fff", // Contrast text color for warning elements
    },
    info: {
      main: "#2196F3", // Info color
      contrastText: "#fff", // Contrast text color for info elements
    },
    divider: "rgba(255, 255, 255, 0.12)", // Divider color
    text: {
      primary: "#FFFFFF", // Primary text color
      secondary: "rgba(255, 255, 255, 0.7)", // Secondary text color
      disabled: "#BDBDBD", // Disabled text color
    },
  },
  typography: {
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
    ].join(","), // Set the font family for typography
  },
});

// Export the customized theme
export default theme;
