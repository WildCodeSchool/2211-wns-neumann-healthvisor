import React, { Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import ContactIcon from "@mui/icons-material/ContactSupport";
import CloseIcon from "@mui/icons-material/Close";
import { useGetProfileQuery } from "../../gql/generated/schema";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

function Sidebar(props: SidebarProps) {
  const { open, onClose } = props;
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();

  return (
    <Fragment>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <List>
          <CloseIcon fontSize="large" onClick={() => onClose()} />
          <ListItem className="centered" onClick={onClose}>
            <ListItemIcon className="large-logo" />
          </ListItem>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />

          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <AccountBoxRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profle" />
          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnection" />
          </ListItem>
          {currentUser && (
            <ListItem button onClick={onClose}>
              <ListItemText primary={`Welcome, ${currentUser.profile.name}`} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Fragment>
  );
}

export default Sidebar;
