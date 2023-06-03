import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [solarPVPriceEstimation, setSolarPVPriceEstimation] = useState(null);
  const [resultType, setResultType] = useState('Energia media diaria [kWh]');
  const [resultDetails, setResultDetails] = useState(null)
  const [energyData, setEnergyData] = useState(null)

  return (
    <Grid container sx={{ ml: -4 }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />
        <Box >
          <Outlet context={[solarPVPriceEstimation, setSolarPVPriceEstimation, resultType, setResultType, resultDetails, setResultDetails, energyData, setEnergyData]} />
        </Box>
      </Box>
    </Grid>
  );
}

export default App;
