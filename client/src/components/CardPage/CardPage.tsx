import React from "react";
import "./CardPage.scss";

const CardPage = ({ page }: any) => {
  const maPage = page ?? {};

  const lastHistory = maPage.histories[maPage.histories.length - 1];
  return (
    <div className="card-page">
      <img
        src={`${process.env.REACT_APP_SCREENSHOT_API}/${lastHistory.screenshot}`}
        alt=""
      />
      <div className="info">
        <p className="url">URL</p>

        <p className="link">{maPage?.url}</p>

        <div className="status-time">
          <p className="time">{lastHistory.responseTime}ms</p>
          <p className="status">{lastHistory.status}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
