import React from 'react'
import { AppBar, Container, Toolbar,Typography, Box, Button } from '@mui/material';

const HomeHeader = () => {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HEALTHVisor
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
          <Button variant="outlined">Connexion</Button>
          <Button variant="contained">Inscription</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default HomeHeader