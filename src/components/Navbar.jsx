import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AppsIcon from "@mui/icons-material/Apps";
import GoogleDarkIcon from "../assets/images/googlelogo_dark.svg";
import GoogleLightIcon from "../assets/images/googlelogo_light.svg";

const Navbar = ({ mode, toggleMode }) => {
  const isDark = mode === "dark";
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        "& .MuiToolbar-root": {
          backgroundColor: theme.palette.mainColors.secondary,
          color: theme.palette.mainColors.text,
          width: "100%",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <IconButton
            sx={{ "&:hover": { backgroundColor: "transparent" }, p: 0 }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                data-test="logo"
                src={isDark ? GoogleDarkIcon : GoogleLightIcon}
                alt="Google Logo"
                style={{
                  marginTop: ".6rem",
                  height: 28,
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Link>
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0, sm: 0.5, md: 1.5 },
          }}
        >
          <Tooltip title="Change appearance">
            <IconButton onClick={toggleMode} aria-label="toggle theme">
              {isDark ? (
                <NightlightIcon fontSize="small" />
              ) : (
                <LightModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Google apps"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <IconButton>
              <AppsIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: theme.palette.mainColors.mainBlue,
            }}
          >
            Sign in
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Navbar;
