import React from "react";

const HistoryItem = ({ history }: any) => {
  return (
    <div className="history-item">
      <p>{history.status}</p>
      <p>{history.date}</p>
      <p>{history.responseTime}ms</p>
      <img
        style={{ width: "100px" }}
        src={`${process.env.REACT_APP_SCREENSHOT_API}/${history.screenshot}`}
        alt="page screenshot"
      />
    </div>
  );
};

export default HistoryItem;
