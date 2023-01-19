import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StorageContext } from '../providers/Storage';
import { Brightness4 } from '@mui/icons-material';
import { ColorMode } from '../providers/ColorMode';
import { useAuth } from '../providers/Storage/auth.hooks';

export const Header = () => {
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorMode);
  const { logout, isLoggedIn } = useAuth();

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
                  logout();
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
          <Brightness4 onClick={toggleColorMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
