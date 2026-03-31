import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
};

export function getFormattedDate() {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(now.getDate()).padStart(2, "0")}`;
  return date;
}
export function getFormattedTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return time;
}

function CutomerDetail() {
  const customerDetails = useSelector((state) => state.customer);

  return (
    <Grid container spacing={2}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "anchor-center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="body2">
            {customerDetails.customerName || "Customer Name"}
          </Typography>
          <Typography variant="caption">
            {customerDetails.orderId || "Order Id"}/ Dine in
          </Typography>
          <Typography variant="caption">
            {getFormattedDate()}, {getFormattedTime()}
          </Typography>
        </Box>
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
          {getInitials(customerDetails.customerName) || "CN"}
        </Box>{" "}
      </Grid>
    </Grid>
  );
}

export default CutomerDetail;
