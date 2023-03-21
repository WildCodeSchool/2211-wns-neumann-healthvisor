import React, { Fragment, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactIcon from '@mui/icons-material/ContactSupport';
import { useFetchUserByIdQuery, UsersDocument } from '../gql/generated/schema';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function Sidebar(props: SidebarProps) {
  const { open, onClose } = props;
  const { data } = useFetchUserByIdQuery({ variables: { id : 14 }})
  const currentUser = data?.fetchUserById;

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
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
           {currentUser && (
            <ListItem button onClick={onClose}>
              <ListItemText primary={`Welcome, ${currentUser.role}`} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Fragment>
  );
}

export default Sidebar;
