import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import "./Historique.scss";
import { formatDate } from "../../functions/formatDate";
import indisponible from "../../assets/images/indisponible.png";

const Historique = () => {
  const {
    state: { page },
  } = useLocation();
  const [open, setOpen] = useState(false);

  const reversedHistories = [...page.histories].reverse();
  const firstHistory = reversedHistories[0];

  const intervales = [];

  for (let i = 1; i < 61; i++) {
    intervales.push(
      <option key={i} value={i}>
        {i} min
      </option>
    );
  }

  const handlerOpenSidebar = () => {
    setOpen(true);
  };

  const handlerCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="historique">
      <Sidebar open={open} onClose={() => handlerCloseSidebar()} />
      <MenuIcon fontSize="large" onClick={() => handlerOpenSidebar()} />
      <div className="last-history">
        <div className="date-last-history">
          <h1>{formatDate(firstHistory.date)}</h1>
          <p>Modifiez l'intervale:</p>
          <select name="intervale" id="intervale">
            {intervales}
          </select>
        </div>
        <div className="card">
          <img
            src={
              firstHistory.screenshot === "none"
                ? indisponible
                : `${process.env.REACT_APP_SCREENSHOT_API}/${firstHistory.screenshot}`
            }
            alt="page screenshot"
          />
          <div className="info">
            <div>
              <p>
                <span className="url">URL</span> {page.url}
              </p>
            </div>

            <div className="status-time">
              <p className="time">{firstHistory.responseTime}ms</p>
              <p
                className="status"
                style={
                  firstHistory.status.startsWith("2")
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
              >
                {firstHistory.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      {reversedHistories.map((history) => {
        return <HistoryItem history={history} key={history.id} />;
      })}
    </div>
  );
};

export default Historique;
