import React, { useEffect } from "react";

import BackButton from "../../components/BackButton/BackButton";
import { Box, Button, Grid, Typography } from "@mui/material";
import TableCard from "./TableCard";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "../../https";
import { toast } from "react-toastify";
import { useState } from "react";

// const tables = [
//   { name: "01", status: "Booked", initial: "Us", user: "User" },
//   { name: "02", status: "Booked", initial: "Sa", user: "User" },
//   { name: "03", status: "Available", initial: "", user: " " },
//   { name: "04", status: "Booked", initial: "Vi", user: "User" },
//   { name: "05", status: "Available", initial: "", user: " " },
//   { name: "06", status: "Booked", initial: "As", user: "User" },
//   { name: "07", status: "Booked", initial: "Ma", user: "User" },
//   { name: "08", status: "Booked", initial: "Da", user: "User" },
//   { name: "09", status: "Booked", initial: "Us", user: "User" },
//   { name: "10", status: "Booked", initial: "Sa", user: "User" },
//   { name: "11", status: "Available", initial: "", user: " " },
//   { name: "12", status: "Booked", initial: "Vi", user: "User" },
//   { name: "13", status: "Available", initial: "", user: " " },
//   { name: "14", status: "Booked", initial: "As", user: "User" },
//   { name: "15", status: "Booked", initial: "Ma", user: "User" },
// ];
function Tables() {
  const [active, setActive] = useState("All");

  function handleFilter(value) {
    setActive(value);
  }
  const { data, error } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });
  console.log("RAW RESPONSE:", data);
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [error]);
  const tables = data?.data?.data || [];
  const getInitial = (table) => {
    const name = table?.currentOrder?.customerDetails?.name;

    let initial = "AM";

    if (name) {
      const words = name.trim().split(" ");

      if (words.length >= 2) {
        // Take first letter of first two words
        initial = words[0][0].toUpperCase() + words[1][0].toUpperCase();
      } else {
        // Only one word → take first 2 letters
        initial = words[0].slice(0, 2).toUpperCase();
      }
    }

    return { initial, name };
  };

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
                  name={table.tableNo}
                  status={table.status}
                  initial={getInitial(table).initial}
                  user={getInitial(table).name}
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
