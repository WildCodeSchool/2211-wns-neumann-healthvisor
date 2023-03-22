import { Box } from "@mui/material";
import React, { Fragment, ReactNode } from "react";
import HomeHeader from "./HomeHeader";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <HomeHeader />
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <div className="main">
          {children}
        </div>
      </Box>
    </Fragment>
  );
};

export default HomeLayout;
