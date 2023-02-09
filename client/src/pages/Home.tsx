import React, { Fragment } from 'react';
import Login from "../components/Login";
import HomeHeader from "../components/HomeHeader";

const Home = () => {
    return (
      <Fragment>
        <HomeHeader />
        <h1>Home</h1>
        <Login />
      </Fragment>
    )
}

export default Home