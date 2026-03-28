import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import OrderCard from "./OrderCard";
import BackButton from "../../components/BackButton/BackButton";

function Order() {
  const [active, setActive] = React.useState("All");
  function handleFilter(value) {
    setActive(value);
  }

  return (
    <Grid container spacing={2} sx={{ mt: "80px" }}>
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "space-between", mx: 8 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
          }}
        >
          <BackButton />
          <Typography variant="h5">Orders</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={() => handleFilter("all")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor: active === "all" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor: active === "all" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilter("inprogress")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor:
                active === "inprogress" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor:
                  active === "inprogress" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            In Progress
          </Button>
          <Button
            onClick={() => handleFilter("contained")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor:
                active === "contained" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor: active === "contained" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            Ready
          </Button>
          <Button
            onClick={() => handleFilter("completed")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor:
                active === "completed" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor: active === "completed" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            Completed
          </Button>
        </Box>
      </Grid>
      <Grid size={12}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-start", mx: 5 }}
        >
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
          <Grid size={3}>
            <OrderCard user={"User"} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Order;
