
import React from "react";
import "./HistoryItem.scss";
import { formatDate } from "../../functions/formatDate";
import indisponible from "../../assets/images/indisponible.png";
const HistoryItem = ({ history }: any) => {

  return (
    <div className="history-item">
      <p className="date">{formatDate(history.date)}</p>
      <p className="response-time">{history.responseTime}ms</p>
      <div className="status-image">
        <div className="image">
          <img
            src={
              history.screenshot === "none"
                ? indisponible
                : `${process.env.REACT_APP_SCREENSHOT_API}/${history.screenshot}`
            }
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