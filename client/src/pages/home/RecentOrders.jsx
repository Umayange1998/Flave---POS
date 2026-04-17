import React from "react";
import {
  Box,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../https";
import { toast } from "react-toastify";
import AdjustIcon from "@mui/icons-material/Adjust";

function RecentOrders() {
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
  const orders = resData?.data?.data || [];
  const last10Orders = orders.slice(-10).reverse();
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          ml: 0,
          background: "#424242",
          borderRadius: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pl: 2,
          width: "50%",
          "&:hover": {
            backgroundColor: "#FFFFFF40",
          },
        }}
      >
        <SearchIcon />

        <TextField
          size="small"
          id="outlined-search"
          placeholder="Search..."
          type="search"
          fullWidth
          sx={{
            pl: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // default
              },
              "&:hover fieldset": {
                border: "none", // hover
              },
              "&.Mui-focused fieldset": {
                border: "none", // active/focus
              },
            },
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: "calc(38vh - 20px)" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {last10Orders.length > 0 ? (
              last10Orders.map((order) => (
                <TableRow
                  //   key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                      <Box
                        backgroundColor="#F77F00"
                        sx={{
                          borderRadius: "50%",

                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {order.customerDetails?.name?.slice(0, 2).toUpperCase()}
                      </Box>
                      <Box>
                        <Typography> {order.customerDetails?.name}</Typography>
                        <Typography variant="caption">
                          {" "}
                          {order.items?.length} items
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell width={"17%"} align="center">
                    <Typography
                      sx={{ border: "solid #F77F00", borderRadius: 2 }}
                      variant="body2"
                    >
                      Table No: {order.table?.tableNo || "N/A"}
                    </Typography>{" "}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {order.orderStatus === "Ready" ? (
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                          }}
                          variant="body2"
                          color="success"
                        >
                          <DoneAllIcon /> Ready
                        </Typography>
                      ) : order.orderStatus === "preparing" ? (
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                          }}
                          variant="body2"
                          color="secondary"
                        >
                          <AdjustIcon /> Preparing
                        </Typography>
                      ) : null}
                      {order.orderStatus === "preparing" ? (
                        <Typography variant="caption">
                          Order In Progress
                        </Typography>
                      ) : order.orderStatus === "Ready" ? (
                        <Typography variant="caption">
                          Ready to Serve
                        </Typography>
                      ) : null}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No recent orders
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box></Box>
    </Box>
  );
}

export default RecentOrders;
