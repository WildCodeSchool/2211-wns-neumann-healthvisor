import React, { Fragment, ReactNode } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import "./HomeLayout.scss";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <HomeHeader />
      <div className="main">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {children}
      </div>
    </Fragment>
  );
};

export default HomeLayout;
