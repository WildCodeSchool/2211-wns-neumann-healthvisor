import React, { Fragment } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useGetProfileQuery } from '../../gql/generated/schema';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchBox from '../SearchBox/SearchBox';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

function Sidebar(props: SidebarProps) {
  const { open, onClose } = props;
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  
  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <Fragment>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={onClose}
      >
        <List>
          <ListItem className="centered" component={Link} to="/" onClick={onClose}>
            <ListItemIcon className="large-logo" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard" onClick={onClose}>
            <ListItemIcon>
              <DeveloperBoardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Mes Pages" />
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
          <ListItem button onClick={handleModalOpen}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Ajouter une page" />
          </ListItem>
        </List>

        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
        >
          <SearchBox></SearchBox>
        </Modal>
      </Drawer>
    </Fragment>
  );
}

export default Sidebar;
