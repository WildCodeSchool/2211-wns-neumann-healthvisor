import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useGetProfileQuery } from "../../gql/generated/schema";
import CardPage from "../../components/CardPage/CardPage";
import "./Dashboard.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const pages = currentUser?.profile.pages;

  return (
    <div id="dashboard">
      <div className="card-page-wrapper">
        {pages && pages.length ? (
          pages.map((page) => {
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
          })
        ) : (
          <div className="empty-message">
            <Link to="/">Ajoutez une page</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
