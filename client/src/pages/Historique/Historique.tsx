import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryItem from "../../components/HistoryItem/HistoryItem";

const Historique = () => {
  const {
    state: { page },
  } = useLocation();
  const [open, setOpen] = useState(false);

  const reversedHistories = [...page.histories].reverse();

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
      <h1>{page.url}</h1>
      {reversedHistories.map((history) => {
        return <HistoryItem history={history} key={history.id} />;
      })}
    </div>
  );
};

export default Historique;
