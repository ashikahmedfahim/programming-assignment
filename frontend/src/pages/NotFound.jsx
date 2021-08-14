import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const NotFound = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h3" color="textSecondary" gutterBottom>
          404 | Page not found
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
