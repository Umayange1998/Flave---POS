import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import OrderCard from "./OrderCard";
import BackButton from "../../components/BackButton/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../https";
import { toast } from "react-toastify";

function Order() {
  const [active, setActive] = React.useState("All");
  function handleFilter(value) {
    setActive(value);
  }
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getAllOrders();
    },
    placeholderData: keepPreviousData,
  });
  if (isError) {
    toast.error("Something went Wrong");
  }
  const orders = resData?.data?.data
    ?.slice() // avoid mutating original
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
          {console.log(resData)}
          {orders ? (
            orders.map((order, index) => {
              return (
                <Grid size={3}>
                  <OrderCard key={order._id} order={order} index={index} />
                </Grid>
              );
            })
          ) : (
            <Typography>No order available</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Order;
