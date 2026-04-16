import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../Assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { updateTable } from "../../Redux/Slices/cutomerSlice";
import { useNavigate } from "react-router-dom";

function getRandomColor() {
  let num = Math.floor(Math.random() * 10);
  return colors[num];
}

function TableCard({ name, status, initial, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDetails = useSelector((state) => state.customer);

  const handleOnclick = (name) => {
    if (status === "Booked" || customerDetails.customerName === "") return;
    dispatch(updateTable({ tableNo: name }));
    console.log("clicked", customerDetails.customerName);
    navigate("/menu");
  };

  return (
    <Grid
      container
      spacing={0.5}
      backgroundColor={"#262626"}
      borderRadius={2}
      padding={2}
      minHeight={"20vh"}
      sx={{
        cursor: "pointer",
      }}
      onClick={() => handleOnclick(name)}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography>Table: {name}</Typography>
        </Box>
        <Box>
          <Chip
            label={status}
            sx={{
              backgroundColor:
                status === "Available"
                  ? "#54D62C33"
                  : status === "Booked"
                    ? "#FCBF4933"
                    : "transparent",

              color:
                status === "Available"
                  ? "#54D62C"
                  : status === "Booked"
                    ? "#FCBF49"
                    : "#fff",

              "& .MuiChip-icon": {
                color:
                  status === "Available"
                    ? "#54D62C"
                    : status === "Booked"
                      ? "#FCBF49"
                      : "#fff",
              },
            }}
          />
        </Box>
      </Grid>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 1,
        }}
      >
        {initial ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              backgroundColor={getRandomColor()}
              sx={{
                borderRadius: "50%",

                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                {" "}
                {initial}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">{user}</Typography>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box
              backgroundColor="#262626"
              sx={{
                borderRadius: "50%",

                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {initial}
            </Box>
            <Box>
              <Typography>{user}</Typography>
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default TableCard;
