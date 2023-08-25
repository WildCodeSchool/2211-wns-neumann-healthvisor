import { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import "./Historique.scss";
import { formatDate } from "../../functions/formatDate";
import indisponible from "../../assets/images/indisponible.png";
import { useUpdatePageMutation } from "../../gql/generated/schema";

const Historique = () => {
  const {
    state: { page },
  } = useLocation();
  const [open, setOpen] = useState(false);

  const [selectedIntervale, setSelectedIntervale] = useState(
    Number(page.intervale)
  );

  const [updatePage] = useUpdatePageMutation();

  const handleChange = async (e: any) => {
    e.preventDefault();
    setSelectedIntervale(Number(e.target.value));
    page.intervale = Number(e.target.value);
    await updatePage({
      variables: {
        data: { id: page.id, intervale: page.intervale, url: page.url },
      },
    });
  };

  const reversedHistories = [...page.histories].sort((a, b) => (Date.parse(a.date) - Date.parse(b.date))).reverse();

  const firstHistory = reversedHistories[0];

  const intervales = [1, 15, 30, 60];
  let intervalesElements: ReactElement[] = [];

  intervales.forEach((intervale, index) => {
    intervalesElements[index] = (
      <option key={intervale} value={intervale}>
        {intervale} min
      </option>
    );
  });

  const handlerOpenSidebar = () => {
    setOpen(true);
  };

  const handlerCloseSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="historique">
      <div className="last-history">
        <div className="date-last-history">
          <h1>{formatDate(firstHistory.date)}</h1>
          <p>Modifiez l'intervale:</p>
          <select
            name="intervale"
            id="intervale"
            value={selectedIntervale}
            onChange={handleChange}
          >
            {intervalesElements}
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
