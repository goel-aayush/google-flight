import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useCallback, useState, useMemo } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import PublicIcon from "@mui/icons-material/Public";
import SearchBar from "../components/Home/SearchBar.jsx";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import FlightsMdUpComp from "../components/Flights/FlightsMdUpComp.jsx";
import { ListItemComp } from "../components/Flights/FlyListItemComp.jsx";
import FlightsMdDownComp from "../components/Flights/FlightsMdDownComp.jsx";

dayjs.extend(duration);

const formatDuration = (minutes) => {
  const dur = dayjs.duration(minutes, "minutes");
  return `${dur.hours() > 0 ? `${dur.hours()} hour ` : ""}${
    dur.minutes() > 0 ? `${dur.minutes()} minutes` : ""
  }`.trim();
};

const DUMMY_ITINERARIES = [
  {
    price: { formatted: "₹12,345" },
    legs: [
      {
        departure: dayjs().add(1, "day").hour(9).minute(30).toISOString(),
        arrival: dayjs().add(1, "day").hour(12).minute(15).toISOString(),
        origin: { city: "Delhi", displayCode: "DEL" },
        destination: { city: "Mumbai", displayCode: "BOM" },
        durationInMinutes: 165,
        carriers: {
          marketing: [
            {
              name: "Example Air",
              logoUrl: "https://via.placeholder.com/40",
            },
          ],
        },
      },
    ],
  },
  {
    price: { formatted: "₹18,750" },
    legs: [
      {
        departure: dayjs().add(2, "day").hour(14).minute(10).toISOString(),
        arrival: dayjs().add(2, "day").hour(17).minute(5).toISOString(),
        origin: { city: "Bengaluru", displayCode: "BLR" },
        destination: { city: "Kolkata", displayCode: "CCU" },
        durationInMinutes: 175,
        carriers: {
          marketing: [
            {
              name: "SkyJet",
              logoUrl: "https://via.placeholder.com/40?text=SJ",
            },
          ],
        },
      },
    ],
  },
  {
    price: { formatted: "₹22,199" },
    legs: [
      {
        departure: dayjs().add(3, "day").hour(6).minute(45).toISOString(),
        arrival: dayjs().add(3, "day").hour(11).minute(25).toISOString(),
        origin: { city: "Chennai", displayCode: "MAA" },
        destination: { city: "Dubai", displayCode: "DXB" },
        durationInMinutes: 280,
        carriers: {
          marketing: [
            {
              name: "IndoFly",
              logoUrl: "https://via.placeholder.com/40?text=IF",
            },
          ],
        },
      },
    ],
  },
  {
    price: { formatted: "₹35,499" },
    legs: [
      {
        departure: dayjs().add(5, "day").hour(23).minute(55).toISOString(),
        arrival: dayjs().add(6, "day").hour(7).minute(15).toISOString(),
        origin: { city: "Delhi", displayCode: "DEL" },
        destination: { city: "London", displayCode: "LHR" },
        durationInMinutes: 500,
        carriers: {
          marketing: [
            {
              name: "Global Airways",
              logoUrl: "https://via.placeholder.com/40?text=GA",
            },
          ],
        },
      },
    ],
  },
  {
    price: { formatted: "₹8,999" },
    legs: [
      {
        departure: dayjs().add(1, "day").hour(20).minute(15).toISOString(),
        arrival: dayjs().add(1, "day").hour(22).minute(0).toISOString(),
        origin: { city: "Hyderabad", displayCode: "HYD" },
        destination: { city: "Goa", displayCode: "GOI" },
        durationInMinutes: 105,
        carriers: {
          marketing: [
            {
              name: "QuickFly",
              logoUrl: "https://via.placeholder.com/40?text=QF",
            },
          ],
        },
      },
    ],
  },
];

const FlightsList = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState([]);
  const location = useLocation();
  const flightData = location.state;
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const itineraries = useMemo(() => {
    const real = flightData?.flightData?.data?.itineraries;
    if (Array.isArray(real) && real.length > 0) return real;
    return DUMMY_ITINERARIES;
  }, [flightData]);

  const handleChange = useCallback(
    (index) => {
      setExpanded((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index]
      );
    },
    [setExpanded]
  );

  return (
    <Container maxWidth="lg">
      <SearchBar bg={"none"} />

      <Stack my={6}>
        {itineraries?.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded.includes(index)}
            onChange={() => handleChange(index)}
            sx={{
              border: `1px solid ${theme.palette.mainColors.border}`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              {expanded.includes(index) ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box>
                    <ListItemComp
                      imgLink={item.legs[0].carriers.marketing[0].logoUrl}
                      img={true}
                      primary={`Departure * ${dayjs(
                        item.legs[0].departure
                      ).format("ddd, MM DD")}`}
                      secondary=""
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      gap: 3,
                    }}
                  >
                    {isXsDown && (
                      <ListItemComp
                        img={false}
                        primary="56kg CO2e"
                        secondary="Avg emissions"
                      />
                    )}
                    <Typography>{item.price.formatted}</Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  {isMdUp ? (
                    <FlightsMdUpComp
                      item={item}
                      formatDuration={formatDuration}
                    />
                  ) : (
                    <FlightsMdDownComp
                      item={item}
                      formatDuration={formatDuration}
                    />
                  )}
                </>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ width: "90%", mx: "auto" }}
              >
                <Grid size={8} sx={{ padding: "auto 2" }}>
                  <Box sx={{ display: "flex", gap: 1.25, alignItems: "start" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                        my: 0.75,
                      }}
                    >
                      <CircleOutlinedIcon sx={{ fontSize: 14 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <FiberManualRecordIcon sx={{ fontSize: 6 }} />
                      <CircleOutlinedIcon sx={{ fontSize: 14 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: theme.palette.mainColors.text,
                          fontSize: "18px",
                        }}
                      >
                        {dayjs(item.legs[0].departure).format("hh:mm A")} *{" "}
                        {item.legs[0].origin.city}{" "}
                        {item.legs[0].origin.displayCode}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.mainColors.secondaryText,
                          fontSize: "14px",
                          my: 1.75,
                        }}
                      >
                        Travel time:{" "}
                        {formatDuration(item.legs[0].durationInMinutes)}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.mainColors.text,
                          fontSize: "18px",
                        }}
                      >
                        {dayjs(item.legs[0].arrival).format("hh:mm A")} *{" "}
                        {item.legs[0].destination.city}{" "}
                        {item.legs[0].destination.displayCode}
                      </Typography>
                      <Stack
                        sx={{
                          my: 4,
                          color: theme.palette.mainColors.secondaryText,
                          fontSize: "13px",
                        }}
                      >
                        {item.legs[0].carriers.marketing[0].name} * Economy *
                        Airbus * A321PC * 2195
                      </Stack>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={4} padding={2}>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "13px",
                      color: theme.palette.mainColors.secondaryText,
                    }}
                  >
                    <AirlineSeatLegroomReducedIcon />
                    Below average legroom (28 in)
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: "13px",
                      color: theme.palette.mainColors.secondaryText,
                    }}
                  >
                    <PublicIcon fontSize="small" />
                    Emissions estimate: 51 kg CO2e
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}{" "}
        {itineraries.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <AlertTitle>No flights found</AlertTitle>
            Please try changing your search criteria.
          </Alert>
        )}
      </Stack>
    </Container>
  );
};

export default FlightsList;
