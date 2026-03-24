import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Greeting from "./Greeting";
import Minicard from "./Minicard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import RecentOrders from "./RecentOrders";
import PopularDishes from "./PopularDishes";

function Home() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", pt: "80px", pl: 5, pb: "80px" }}
    >
      <Grid size={7}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Greeting />
          </Grid>
          <Grid size={6}>
            <Minicard
              title={"Toal Earnings"}
              icon={<MonetizationOnIcon color="success" />}
              amount={420}
              stat={16}
            />
          </Grid>
          <Grid size={6}>
            <Minicard
              title={"Pending"}
              amount={12}
              icon={<HourglassTopIcon color="warning" />}
              stat={16}
            />
          </Grid>
          <Grid size={12}>
            <Box
              height={"100%"}
              sx={{ background: "#262626", borderRadius: 2, p: 2 }}
            >
              <RecentOrders />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={5}>
        <Box
          height={"100%"}
          sx={{ background: "#262626", borderRadius: 2, p: 2, mr: 2 }}
        >
          <PopularDishes />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
