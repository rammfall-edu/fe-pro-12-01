import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project
          </Typography>
          {isLoggedIn ? (
            <>
              <Button href="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  navigate('/login');
                }}
                color="inherit"
              >
                Exit
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" color="inherit">
                Login
              </Button>
              <Button href="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
