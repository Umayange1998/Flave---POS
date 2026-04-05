import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { flex, keyframes } from "@mui/system";
import restaurant from "../../Assets/restaurant.jpg";
import { useState } from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
function AuthPAge() {
  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
  const [isSignIn, setIsSignIn] = useState(true);
  const [generalError, setGeneralError] = useState("");
  const [regEmailError, setRegEmailError] = useState("");
  const [regPasswordError, setRegPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    setGeneralError("");
    if (name === "email") setRegEmailError("");
    if (name === "password") setRegPasswordError("");
    if (name === "name") setFullNameError("");
    if (name === "phone") setPhoneError("");
    // setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // const [errors, setErrors] = useState({});

  const handleChangeForm = () => {
    setIsSignIn((prev) => !prev);
    setGeneralError("");
    setRegEmailError("");
    setRegPasswordError("");
    setFullNameError("");
    setData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    });
  };
  const handleRoleSelection = (selectedRole) => {
    setData({ ...data, role: selectedRole });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={7} sx={{ height: "100vh", position: "relative" }}>
        <img
          src={restaurant}
          alt="restaurant"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "absolute",
            // justifyContent: "space-between",
            maxWidth: {
              xs: "90%",
              sm: "70%",
              md: "70%",
            },
            left: {
              xs: "5%",
              md: "6vw",
            },
            bottom: {
              xs: "0%",
              sm: "8%",
              md: "10%",
            },
            //  top: {
            //   xs: "8%",
            //   sm: "30%",
            //   md: "30%",
            // },
            zIndex: 2,
            animation: `${fadeIn} 3s ease`,
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "poppins",
              textAlign: "left",
              mb: "0",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.75rem",
                lg: "3.75rem",
              },
            }}
          >
            Flave
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
                md: "1.2rem",
                lg: "1.5rem",
              },
              fontFamily: "roboto",
              textAlign: "left",
              display: "flex",
              my: "1rem",
            }}
          >
            Enjoy a variety of delicious dishes made from fresh ingredients,
            crafted to satisfy your taste buds.
          </Typography>
        </Box>
      </Grid>
      <Grid size={5}>
        <Box>
          {/* FORM PANEL */}
          <Grid
            item
            xs={12}
            md={6}
            px={{ xs: 3, md: 4 }}
            py={{ xs: 3, md: 10 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mx={"auto"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
              mb={3}
            >
              <Box
                sx={{
                  border: "4px solid white",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocalDiningIcon sx={{ width: 40, height: 40 }} />{" "}
              </Box>
              <Typography variant="h4" color="#ff9f1c" fontWeight="bold">
                {isSignIn ? "Employee LogIn" : "Employee Registration"}
              </Typography>
            </Box>

            <Box
              sx={{
                component: "form",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pt: 5,
              }}
            >
              {!isSignIn && (
                <TextField
                  size="small"
                  placeholder="Full Name"
                  onChange={onChangeHandler}
                  name="name"
                  value={data.name}
                  fullWidth
                  error={!!fullNameError}
                  helperText={fullNameError}
                />
              )}

              {!isSignIn ? (
                <TextField
                  size="small"
                  placeholder="Email Address"
                  type="email"
                  onChange={onChangeHandler}
                  name="email"
                  value={data.email}
                  fullWidth
                  error={!!regEmailError}
                  helperText={regEmailError}
                />
              ) : (
                <TextField
                  size="small"
                  placeholder="Email Address"
                  type="email"
                  onChange={onChangeHandler}
                  name="email"
                  value={data.email}
                  fullWidth
                  error={!!generalError}
                  // helperText={errors.email}
                />
              )}
              {!isSignIn && (
                <TextField
                  size="small"
                  placeholder="Phone"
                  onChange={onChangeHandler}
                  name="Phone"
                  value={data.phone}
                  fullWidth
                  error={!!phoneError}
                  helperText={phoneError}
                />
              )}

              {!isSignIn ? (
                <TextField
                  size="small"
                  placeholder="Password"
                  type="password"
                  onChange={onChangeHandler}
                  name="password"
                  value={data.password}
                  fullWidth
                  error={!!regPasswordError}
                  helperText={regPasswordError}
                />
              ) : (
                <TextField
                  size="small"
                  placeholder="Password"
                  type="password"
                  onChange={onChangeHandler}
                  name="password"
                  value={data.password}
                  fullWidth
                  error={!!generalError}
                  // helperText={generalError.password}
                />
              )}

              {!isSignIn && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  {["Waiter", "Cashier", "Admin"].map((role) => (
                    <Button
                      key={role}
                      variant="contained"
                      onClick={() => handleRoleSelection(role)}
                      sx={{
                        flex: 1,
                        backgroundColor:
                          data.role === role ? "#FFC107" : "#ffffff",
                        color: data.role === role ? "#fff" : "#000",
                        "&:hover": {
                          backgroundColor:
                            data.role === role ? "#FFC107" : "#f0f0f0",
                        },
                      }}
                    >
                      {role}
                    </Button>
                  ))}
                </Box>
              )}

              {generalError && (
                <Typography color="error" fontSize="0.9rem">
                  {generalError}
                </Typography>
              )}

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  background: "linear-gradient(135deg, #ff7a18, #ff9f1c)",
                }}
                onClick={handleSubmit}
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>

              <Typography textAlign="center" mt={3}>
                {isSignIn ? (
                  <>
                    Don’t have an account?{" "}
                    <Button variant="text" onClick={handleChangeForm}>
                      {" "}
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button variant="text" onClick={handleChangeForm}>
                      Sign in
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AuthPAge;
