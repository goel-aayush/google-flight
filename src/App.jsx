import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline, responsiveFontSizes } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  const toggleMode = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const theme = useMemo(() => {
    const base = mode === "dark" ? darkTheme : lightTheme;
    return responsiveFontSizes(base);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter mode={mode} toggleMode={toggleMode} />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
