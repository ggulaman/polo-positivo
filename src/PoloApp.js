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

  const technologyTypes = [
    { name: 'PEM', id: 'PEM', unitaryPowerCost: 55, capex: 1400000, opex: 0.25 / 6 },
    { name: 'Alcalina', id: 'Alcalina', unitaryPowerCost: 48, capex: 900000, opex: 0.25 / 10 },
    { name: 'SOEC', id: 'SOEC', unitaryPowerCost: 38, capex: 3800000, opex: 0.25 / 2 },
  ];

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
          <Outlet context={{ solarPVPriceEstimation, setSolarPVPriceEstimation, resultType, setResultType, resultDetails, setResultDetails, energyData, setEnergyData, technologyTypes }} />
        </Box>
      </Box>
    </Grid>
  );
}

export default App;
