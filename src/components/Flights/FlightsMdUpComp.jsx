import { Grid, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { ListItemComp } from "./FlyListItemComp.jsx";

const FlightsMdUpComp = ({ item, formatDuration }) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Grid item="true" size={{ xs: 4, md: 4 }}>
        <ListItemComp
          imgLink={item.legs[0]?.carriers.marketing[0].logoUrl}
          img={true}
          primary={`${dayjs(item.legs[0].departure).format("h:mm A")} - ${dayjs(
            item.legs[0].arrival
          ).format("h:mm A")}`}
          secondary={item.legs[0].carriers.marketing[0].name}
        />
      </Grid>

      <Grid
        item="true"
        size={{ xs: 6, md: 5 }}
        sx={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Grid
            item="true"
            size={{ xs: 4 }}
            sx={{ justifyContent: "flex-start" }}
          >
            <ListItemComp
              img={false}
              primary={formatDuration(item.legs[0].durationInMinutes)}
              secondary={`${item.legs[0].origin.displayCode} - ${item.legs[0].destination.displayCode}`}
            />
          </Grid>
          <Grid
            item="true"
            size={{ xs: 5 }}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Typography>
              {item.legs[0].stopCount === 0
                ? "Nonstop"
                : item.legs[0].stopCount + " Transfer"}
            </Typography>
          </Grid>
          <Grid
            item="true"
            size={{ xs: 3 }}
            sx={{ justifyContent: "flex-end", display: "flex" }}
          >
            <ListItemComp
              img={false}
              primary="56kg CO2e"
              secondary="Avg emissions"
              sx={{ textAlign: "right" }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item="true" size={{ xs: 2, md: 3 }} sx={{ textAlign: "right" }}>
        <Typography>{item.price.formatted}</Typography>
      </Grid>
    </Grid>
  );
};

export default FlightsMdUpComp;
