import {
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { getAllOrders, updateOrder } from "../../https";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function OrderTab() {
  const queryClient = useQueryClient();
  const [orderStatus, setOrderStatus] = useState({});

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
  const updateOrderMutation = useMutation({
    mutationFn: (reqData) => updateOrder(reqData),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const handleRefreshUpdate = (orderId) => {
    const newStatus =
      orderStatus[orderId] ??
      orders.find((o) => o._id === orderId)?.orderStatus;

    updateOrderMutation.mutate(
      {
        orderId,
        orderStatus: newStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["orders"]);
        },
      },
    );
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12} sx={{ background: "#262626", borderRadius: 2, p: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Dateand Time</TableCell>
                <TableCell align="center">Items</TableCell>
                <TableCell align="center">Table No</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order, index) => {
                const currentStatus =
                  orderStatus[order._id] ?? order.orderStatus;
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      #10{index}
                    </TableCell>
                    <TableCell align="center">
                      {order.customerDetails.name}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={orderStatus[order._id] ?? order.orderStatus}
                        size="small"
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "#262626",
                            },
                          },
                        }}
                        sx={{
                          width: "80%",
                          color:
                            currentStatus === "Ready"
                              ? "success.main"
                              : "secondary.main",

                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor:
                              currentStatus === "Ready"
                                ? "success.main"
                                : "secondary.main",
                          },

                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor:
                              currentStatus === "Ready"
                                ? "success.main"
                                : "secondary.main",
                          },

                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor:
                              currentStatus === "Ready"
                                ? "success.main"
                                : "secondary.main",
                          },
                        }}
                      >
                        <MenuItem
                          sx={{ color: "#FFC107", background: "#262626" }}
                          value={"preparing"}
                        >
                          preparing
                        </MenuItem>
                        <MenuItem
                          sx={{ color: "#54D62C", background: "#262626" }}
                          value={"Ready"}
                        >
                          Ready
                        </MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">{order.orderDate}</TableCell>
                    <TableCell align="center">{order.items.length} </TableCell>
                    <TableCell align="center">
                      Table- {order.table?.tableNo || "N/A"}
                    </TableCell>
                    <TableCell align="center">$ {order.bills.total}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRefreshUpdate(order._id)}
                        sx={{ color: "info.main" }}
                      >
                        <AutorenewIcon />{" "}
                      </IconButton>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default OrderTab;
