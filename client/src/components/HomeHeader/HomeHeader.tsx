import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Login from "../Login/Login";
import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../../gql/generated/schema";
import { useNavigate } from "react-router-dom";
import SignUp from "../Register/SignUp";
import logo from "../../assets/images/logo.png";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const [signType, setSignType] = useState("");

  const handleClickSignIn = () => {
    setSignType("sign-in");
    setOpen(true);
  };

  const handleClickSignUp = () => {
    setSignType("sign-up");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const logOut = async () => {
    await logoutUser();
    client.resetStore();
    window.location.reload();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#EAEFF1" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              alt="HEALTHVisor Logo"
              style={{
                marginRight: 16,
                height: 60,
                width: "auto",
              }}
            />
          </Box>

          {currentUser?.profile ? (
            <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                disableElevation
                onClick={handleDashboard}
                startIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={logOut}
                startIcon={<LogoutIcon />}
              >
                Deconnexion
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                disableElevation
                startIcon={<LoginIcon />}
                onClick={handleClickSignIn}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                startIcon={<AppRegistrationIcon />}
                onClick={handleClickSignUp}
              >
                Inscription
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {signType === "sign-in" ? <Login isLogged={handleClose} /> : ""}
          {signType === "sign-up" ? <SignUp isLogged={handleClose} /> : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default HomeHeader;
