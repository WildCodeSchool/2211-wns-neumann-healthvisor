
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import theme from "./assets/stylesheet/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./gql/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider } from "@mui/system";
import Historique from "./pages/Historique/Historique";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div id="add-flash"></div>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/page" element={<Historique />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send
