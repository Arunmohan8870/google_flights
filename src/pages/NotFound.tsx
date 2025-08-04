import { useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 6, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom color="error">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Oops! Page not found.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/"
          sx={{ mt: 3 }}
        >
          Return to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
