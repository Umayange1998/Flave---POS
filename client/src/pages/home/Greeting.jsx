import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function Greeting() {
  const [now, setNow] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  // Get time string
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Get date string with month name
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = now.getHours();
  let greeting = "Good Morning";

  if (hour >= 12 && hour < 18) greeting = "Good Afternoon";
  else if (hour >= 18) greeting = "Good Evening";
  return (
    <Box
      sx={{
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "start",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff",
            mb: 0,
          }}
        >
          {greeting}
        </Typography>
        <Typography
          sx={{
            color: "#ffffff",
            mb: 0,
            fontSize: "1rem",
          }}
        >
          User Give Your Best Service to Customer 😊
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "end",
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            mb: 0,
            fontSize: "h3",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            color: "#ffffff",
            mb: 0,
          }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
}

export default Greeting;
