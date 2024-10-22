import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    const handleNavigateToFavorites = () => {
        navigate('/favorites');
    };
    const handleNavigateToHome = () => {
      navigate("/");
    };

    return (
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar position="sticky">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="inherit" onClick={handleNavigateToHome}>
              <Typography variant="h6">Weather App</Typography>
            </Button>
            <Button color="inherit" onClick={handleNavigateToFavorites}>
              Favorites
              <FavoriteIcon color="error" />
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" style={{ flexGrow: 1, padding: "16px" }}>
          {children}
        </Container>
        <Box
          component="footer"
          py={2}
          textAlign="center"
          bgcolor="text.secondary"
          color="white"
        >
          <Typography variant="body2">© 2024 Weather App</Typography>
        </Box>
      </Box>
    );
};

export default Layout;