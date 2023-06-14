import { Box } from "@mui/material";
import React from "react";
import HomeLayout from "../components/HomeLayout/HomeLayout";
import SearchBox from "../components/SearchBox/SearchBox";

const Home = () => {
  return (
    <HomeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <SearchBox></SearchBox>
      </Box>
    </HomeLayout>
  );
};

export default Home;
