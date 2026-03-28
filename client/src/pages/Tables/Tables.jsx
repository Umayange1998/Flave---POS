import React from "react";

import BackButton from "../../components/BackButton/BackButton";
import { Box, Button, Grid, Typography } from "@mui/material";
import TableCard from "./TableCard";

const tables = [
  { name: "Table 01", status: "Booked", initial: "Us", user: "User" },
  { name: "Table 02", status: "Booked", initial: "Sa", user: "User" },
  { name: "Table 03", status: "Available", initial: "", user: " " },
  { name: "Table 04", status: "Booked", initial: "Vi", user: "User" },
  { name: "Table 05", status: "Available", initial: "", user: " " },
  { name: "Table 06", status: "Booked", initial: "As", user: "User" },
  { name: "Table 07", status: "Booked", initial: "Ma", user: "User" },
  { name: "Table 08", status: "Booked", initial: "Da", user: "User" },
  { name: "Table 09", status: "Booked", initial: "Us", user: "User" },
  { name: "Table 10", status: "Booked", initial: "Sa", user: "User" },
  { name: "Table 11", status: "Available", initial: "", user: " " },
  { name: "Table 12", status: "Booked", initial: "Vi", user: "User" },
  { name: "Table 13", status: "Available", initial: "", user: " " },
  { name: "Table 14", status: "Booked", initial: "As", user: "User" },
  { name: "Table 15", status: "Booked", initial: "Ma", user: "User" },
];
function Tables() {
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
          <Typography variant="h5">Tables</Typography>
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
            onClick={() => handleFilter("booked")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor: active === "booked" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor: active === "booked" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            Booked
          </Button>
          <Button
            onClick={() => handleFilter("available")}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor:
                active === "available" ? "#424242" : "transparent",
              color: "#fff",
              "&:hover": {
                backgroundColor: active === "available" ? "#424242" : "#2a2a2a",
              },
            }}
          >
            Available
          </Button>
        </Box>
      </Grid>
      <Grid size={12}>
        <Grid
          container
          gap={1.8}
          sx={{ display: "flex", justifyContent: "flex-start", mx: 8 }}
        >
          {tables.map((table) => {
            return (
              <Grid size={2.3}>
                <TableCard
                  name={table.name}
                  status={table.status}
                  initial={table.initial}
                  user={table.user}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Tables;
