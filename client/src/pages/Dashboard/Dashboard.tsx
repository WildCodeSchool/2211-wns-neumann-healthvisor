import React, { Fragment, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetProfileQuery } from "../../gql/generated/schema";
import CardPage from "../../components/CardPage/CardPage";
import "./Dashboard.scss";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const handlerOpenSidebar = () => {
    setOpen(true);
  };

  const handlerCloseSidebar = () => {
    setOpen(false);
  };

  const pages = currentUser?.profile.pages;

  return (
    <div id="dashboard">
      <Sidebar open={open} onClose={() => handlerCloseSidebar()} />
      <button onClick={() => handlerOpenSidebar()}>Open</button>
      <div className="card-page-wrapper">
        {pages?.map((page) => (
          <CardPage page={page} key={page.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
