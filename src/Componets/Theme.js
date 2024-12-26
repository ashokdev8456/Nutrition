import React, { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? "#121212" : "#f5f5f5",
            color: darkMode ? "#ffffff" : "#000000",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
