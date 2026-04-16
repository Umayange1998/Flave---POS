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
import { orders } from "../../Assets/orders";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function TabThree() {
  const handleStatusChange = () => {};

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
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="center">{order.customer}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={order.status}
                      size="small"
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
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
                          order.status === "Ready"
                            ? "success.main"
                            : "secondary.main",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            order.status === "Ready"
                              ? "success.main"
                              : "secondary.main",
                        },

                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            order.status === "Ready"
                              ? "success.main"
                              : "secondary.main",
                        },

                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor:
                            order.status === "Ready"
                              ? "success.main"
                              : "secondary.main",
                        },
                      }}
                    >
                      <MenuItem
                        sx={{ color: "#54D62C", background: "#262626" }}
                        value={"InProgress"}
                      >
                        In Progress
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "#FFC107", background: "#262626" }}
                        value={"Ready"}
                      >
                        Ready
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">{order.dateTime}</TableCell>
                  <TableCell align="center">{order.items}</TableCell>
                  <TableCell align="center">Table- {order.tableNo}</TableCell>
                  <TableCell align="center">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "info.main" }}>
                      <AutorenewIcon />{" "}
                    </IconButton>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default TabThree;
