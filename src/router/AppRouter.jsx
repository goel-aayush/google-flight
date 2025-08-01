import { CircularProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Navbar = lazy(() => import("../components/Navbar.jsx"));
const Footer = lazy(() => import("../components/Footer.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const FlightsList = lazy(() => import("../pages/FlightsList.jsx"));
const NotFoundComp = lazy(() => import("../pages/NotFoundComp.jsx"));

const AppRouter = ({ mode, toggleMode }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<FlightsList />} />
          <Route path="*" element={<NotFoundComp />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
