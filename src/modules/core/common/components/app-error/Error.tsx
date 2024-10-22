import React, { useContext } from "react";
import { Container, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { WeatherDataContext } from "@/modules/core/context/context";

const Error: React.FC = () => {
  const { state } = useContext(WeatherDataContext);
  const { error } = state;
  const navigate = useNavigate();
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <ErrorOutlineIcon style={{ fontSize: "100px", color: "red" }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Return
      </Button>
    </Container>
  );
};

export default Error;
