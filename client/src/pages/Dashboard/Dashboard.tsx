import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetProfileQuery } from "../../gql/generated/schema";
import CardPage from "../../components/CardPage/CardPage";
import "./Dashboard.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

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
      <MenuIcon fontSize="large" onClick={() => handlerOpenSidebar()} />
      <div className="card-page-wrapper">
        {pages?.map((page) => {
          const lastHistory = page.histories[page.histories.length - 1];
          const pageInfos = {
            screenshot: lastHistory.screenshot,
            status: lastHistory.status,
            responseTime: lastHistory.responseTime,
          };
          return (
            <Link to="/page" state={{ page }} key={page.id}>
              <CardPage infos={pageInfos} url={page.url} pageId={page.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
