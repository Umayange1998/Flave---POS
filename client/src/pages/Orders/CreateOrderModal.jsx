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
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../Redux/Slices/cutomerSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#262626",
  border: "2px solid ##262626",
  boxShadow: 24,
  px: 3,
  py: 5,
};

function CreateOrderModal({ open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    let temp = {};

    if (!name.trim()) {
      temp.name = "Customer name is required";
    }

    if (!phone.trim()) {
      temp.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      temp.phone = "Invalid phone number";
    }

    if (guestCount < 1) {
      temp.guestCount = "At least 1 guest required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  }

  function handlePlaeOrder() {
    if (!validate()) return;
    dispatch(setCustomer({ name, phone, guest: guestCount }));
    navigate("/tables");
    onClose();
  }
  function increase() {
    if (guestCount < 6) {
      setGuestCount((prev) => prev + 1);
      setErrors((prev) => ({ ...prev, guestCount: "" }));
    }
  }
  function decrease() {
    if (guestCount > 0) {
      setGuestCount((prev) => prev - 1);
      setErrors((prev) => ({ ...prev, guestCount: "" }));
    }
  }
  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setGuestCount(0);
      setErrors({});
    }
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
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
            Create Order
          </Typography>
          <IconButton onClick={onClose}>
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
            <Typography variant="caption">Costomer Name</Typography>
            <TextField
              fullWidth
              size={"small"}
              placeholder="Enter Costomer Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={!!errors.name}
              sx={{
                background: "#424242",
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   border: "none", // default
                  // },
                  // "&:hover fieldset": {
                  //   border: "none", // hover
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff", // active/focus
                  },
                },
              }}
            />
            {errors.name && (
              <Typography color="error" variant="caption">
                {errors.name}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="caption">Phone Number</Typography>
            <TextField
              fullWidth
              size={"small"}
              placeholder="+94121212123"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              error={!!errors.phone}
              sx={{
                background: "#424242",
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   border: "none", // default
                  // },
                  // "&:hover fieldset": {
                  //   border: "none", // hover
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffffff", // active/focus
                  },
                },
              }}
            />
            {errors.phone && (
              <Typography color="error" variant="caption">
                {errors.phone}
              </Typography>
            )}
          </Box>
          <Typography variant="caption">Guests Count</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#424242",
              mb: 1,
            }}
          >
            <IconButton onClick={() => decrease()}>
              <RemoveIcon />
            </IconButton>
            <Typography>{guestCount}</Typography>
            <IconButton onClick={() => increase()}>
              <AddIcon />
            </IconButton>
          </Box>
          {errors.guestCount && (
            <Typography color="error" variant="caption">
              {errors.guestCount}
            </Typography>
          )}

          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => handlePlaeOrder()}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default CreateOrderModal;
