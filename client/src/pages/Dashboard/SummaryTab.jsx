import { Box, Grid, Typography } from "@mui/material";
import React from "react";

function TabOne() {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Box sx={{ textAlign: "start", mb: 3 }}>
          <Typography sx={{ fontSize: 25 }}>Overall Performance</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            dolor rutrum, euismod justo et.{" "}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid
              size={3}
              sx={{
                bgcolor: "primary.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Revenue</Typography>
              </Box>
              <Box>
                <Typography variant="h5">$500</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "warning.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Outbound Clicks</Typography>
              </Box>
              <Box>
                <Typography variant="h5">500</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "#6A4C93",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Total Customer</Typography>
              </Box>
              <Box>
                <Typography variant="h5">451</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "#FF6B6B",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Event Count</Typography>
              </Box>
              <Box>
                <Typography variant="h5">200</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box sx={{ textAlign: "start", mb: 3 }}>
          <Typography sx={{ fontSize: 25 }}>Item Details</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            dolor rutrum, euismod justo et.{" "}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid
              size={3}
              sx={{
                bgcolor: "success.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Total Catergories</Typography>
              </Box>
              <Box>
                <Typography variant="h5">8</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "error.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Total Dishes</Typography>
              </Box>
              <Box>
                <Typography variant="h5">51</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "info.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Active Orders</Typography>
              </Box>
              <Box>
                <Typography variant="h5">12</Typography>
              </Box>
            </Grid>
            <Grid
              size={3}
              sx={{
                bgcolor: "secondary.main",
                borderRadius: 2,
                py: 1,
                px: 2,
                textAlign: "start",
              }}
            >
              <Box>
                <Typography variant="caption">Total tables</Typography>
              </Box>
              <Box>
                <Typography variant="h5">15</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid size={12}></Grid>
    </Grid>
  );
}

export default TabOne;
