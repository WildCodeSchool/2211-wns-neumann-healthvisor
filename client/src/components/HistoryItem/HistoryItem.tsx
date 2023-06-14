import React, { useState } from "react";
import "./HistoryItem.scss";
const HistoryItem = ({ history }: any) => {
  const date = new Date(history.date);

  const options = {
    weekday: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return (
    <div className="history-item">
      <p className="date">{history.date}</p>
      <p className="response-time">{history.responseTime}ms</p>
      <div className="status-image">
        <div className="image">
          <img
            src={`${process.env.REACT_APP_SCREENSHOT_API}/${history.screenshot}`}
            alt="page screenshot"
          />
        </div>
        <p
          className="status"
          style={
            history.status.startsWith("2")
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
        >
          {history.status}
        </p>
      </div>
    </div>
  );
};

export default HistoryItem;
