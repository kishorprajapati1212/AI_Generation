import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import { Box, Typography, Button } from "@mui/material";
import Theme from "../../../Theme";
import { useNavigate, useLocation } from "react-router-dom";

const Imgside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const features = [
    {
      name: "Image",
      icon: <FaRegImage />,
      route: "/Image_generation",
    },
    {
      name: "Video",
      icon: <MdOutlineOndemandVideo />,
      route: "/Video_generation",
    },
    {
      name: "Skybox",
      icon: <GoInbox />,
      route: "/Skybox_generation",
    },
  ];

  return (
    <Box
      sx={{
        width: { xs: "15%", sm: "10%", md: "5%" }, // Responsive width
        backgroundColor: `${Theme.primary[50]}`,
        color: "#fff",
        p: { xs: 0.5, md: 1 }, // Adjust padding based on screen size
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 0.5, md: 1 }, // Adjust gap between elements
        overflow: "hidden", // Ensures layout integrity on smaller screens
      }}
    >
      {/* <Typography
        variant="body2"
        sx={{
          mb: { xs: 1, md: 2 },
          whiteSpace: "nowrap",
          fontSize: { xs: "0.8rem", md: "1rem" }, // Responsive font size
        }}
      >
        Features
      </Typography> */}
      {features.map((feature) => (
        <Button
          key={feature.name}
          fullWidth
          variant="outlined"
          sx={{
            mb: { xs: 0.5, md: 1 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 0.3, md: 0.5 }, // Adjust gap between icon and text
            padding: { xs: "6px", md: "8px" },
            minWidth: 0,
            // backgroundColor:
            //   location.pathname === feature.route
            //     ? Theme.primary[100]
            //     : "transparent", // Active background
            color: 
            location.pathname === feature.route
              ? "#fff" // Box shadow for active
              : "gray",

            borderColor: "transparent",
            "&:hover": {
              backgroundColor: Theme.primary[10],
            },
          }}
          onClick={() => navigate(feature.route)}
        >
          {feature.icon}
          <Typography
            variant="caption"
            sx={{
              textShadow:
                location.pathname === feature.route
                  ? "0px 0px 10px rgba(255, 255, 250, 1)" // Box shadow for active
                  : "none",
              color: location.pathname === feature.route
                ? "#fff" // Box shadow for active
                : "gray",
              fontSize: { xs: "0.6rem", md: "0.8rem" }, // Responsive font size
            }}
          >
            {feature.name}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default Imgside;
