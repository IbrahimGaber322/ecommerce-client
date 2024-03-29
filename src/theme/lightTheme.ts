// Import necessary function from MUI for creating themes
import { createTheme } from "@mui/material/styles";

// Create a customized MUI theme
const theme = createTheme({
  palette: {
    mode: "light", // Set the theme mode to light
    primary: {
      main: "#2962FF", // Main primary color
      contrastText: "#FFFFFF", // Contrast text color for primary elements
    },
    secondary: {
      main: "#FFC107", // Main secondary color
      contrastText: "#000000", // Contrast text color for secondary elements
    },
    background: {
      default: "#F5F5F5", // Default background color
      paper: "#FFFFFF", // Background color for paper elements
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
      main: "#FF9800", // Warning color
      contrastText: "#fff", // Contrast text color for warning elements
    },
    info: {
      main: "#2196F3", // Info color
      contrastText: "#fff", // Contrast text color for info elements
    },
    divider: "rgba(0, 0, 0, 0.12)", // Divider color
    text: {
      primary: "#333333", // Primary text color
      secondary: "#777777", // Secondary text color
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
