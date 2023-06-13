import React from "react";
import "./CardPage.scss";

const CardPage = ({
  infos: { screenshot, status, responseTime },
  url,
}: any) => {
  return (
    <div className="card-page">
      <img
        src={`${process.env.REACT_APP_SCREENSHOT_API}/${screenshot}`}
        alt="page screenshot"
      />
      <div className="info">
        <div>
          <p>
            <span className="url">URL</span> {url}
          </p>
        </div>

        <div className="status-time">
          <p className="time">{responseTime}ms</p>
          <p
            className="status"
            style={
              status.startsWith("2")
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
