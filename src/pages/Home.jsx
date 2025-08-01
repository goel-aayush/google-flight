import { Container, useTheme } from "@mui/material";
import SearchBar from "../components/Home/SearchBar.jsx";
import NearByAirports from "../components/Home/NearByAirports.jsx";
import LandingPage from "../components/LandingPage.jsx";

const Home = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <LandingPage darkMode={theme.palette.mode === "dark"} />
      <SearchBar bg={theme.palette.mainColors.secondary} />
      <NearByAirports />
    </Container>
  );
};

export default Home;
