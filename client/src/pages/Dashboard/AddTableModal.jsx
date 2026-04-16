import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../https";

function AddTableModal({ open, handleClose }) {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [errors, setErrors] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [tableNo, setTableNo] = useState("");

  const handleSubmit = () => {
    console.log(tableNo, numberOfSeats);
    tableMutation.mutate({ tableNo, seats: numberOfSeats });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#262626",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const tableMutation = useMutation({
    mutationFn: (reqData) => api.post(`${baseURL}/tables/addtable`, reqData),
    onSuccess: (res) => {
      const { data } = res;
      console.log(data);
      setNumberOfSeats("");
      setTableNo("");
      handleClose();
    },
    onError: (error) => {
      console.log(error);
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container spacing={2} sx={style}>
        <Grid
          size={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Table
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon
              sx={{
                color: "#424242",
                "&:hover": {
                  color: "#FFFFFF40",
                },
              }}
            />
          </IconButton>
        </Grid>
        <Divider
          sx={{
            width: "100%",
            borderColor: "#424242",
            borderBottomWidth: 3,
          }}
        />
        <Grid size={12}>
          <Box>
            <Typography variant="caption">Table Number</Typography>
            <TextField
              fullWidth
              type="text"
              size="small"
              sx={{ mb: 1, mt: 1 }}
              value={tableNo}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setTableNo(onlyNumbers);
              }}
            />
            {/* {errors.name && (
              <Typography color="error" variant="caption">
                {errors.name}
              </Typography>
            )} */}
          </Box>
          <Box>
            <Typography variant="caption">Number of Seats</Typography>
            <TextField
              fullWidth
              type="text"
              size="small"
              sx={{ mb: 1, mt: 1 }}
              value={numberOfSeats}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNumberOfSeats(onlyNumbers);
              }}
            />
            {/* {errors.phone && (
              <Typography color="error" variant="caption">
                {errors.phone}
              </Typography>
            )} */}
          </Box>

          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Add Table
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default AddTableModal;
