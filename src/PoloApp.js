import React, { useState } from "react";
import moment from 'moment';
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [solarPVPriceEstimation, setSolarPVPriceEstimation] = useState(null);
  const [reePriceEstimation, setReePriceEstimation] = useState(null);
  const [date, setDate] = useState(moment());
  const [time0f, setTime0f] = useState(moment().startOf('day'));
  const [time0l, setTime0l] = useState(moment().endOf('day'));
  const [averagePrice, setAveragePrice] = useState();
  const [resultType, setResultType] = useState('Energia media diaria [kWh]');
  const [resultDetails, setResultDetails] = useState({ "latitude": 42, "longitude": -3.31, "elevation": 963, "fixed": { "slope": { "value": 35, "optimal": false }, "azimuth": { "value": 1, "optimal": false }, "type": "free-standing" }, "E_d": 17.9, "E_m": 544.44, "E_y": 6533.23, "H(i)_d": 5.03, "H(i)_m": 152.85, "H(i)_y": 1834.21, "SD_m": 22.92, "SD_y": 275.06, "l_aoi": -2.78, "l_spec": "0.77", "l_tg": -6.05, "l_total": -20.85, "LCOE_pv": 0.11 })
  const [energyData, setEnergyData] = useState({ "E_d": [{ "mes": "Enero", "energia": 11.43 }, { "mes": "Febrero", "energia": 14.46 }, { "mes": "Marzo", "energia": 17.63 }, { "mes": "Abril", "energia": 18.75 }, { "mes": "Mayo", "energia": 21.06 }, { "mes": "Junio", "energia": 22.11 }, { "mes": "Julio", "energia": 24.15 }, { "mes": "Agosto", "energia": 23.65 }, { "mes": "Septiembre", "energia": 20.82 }, { "mes": "Octubre", "energia": 17.01 }, { "mes": "Noviembre", "energia": 12.09 }, { "mes": "Diciembre", "energia": 11.36 }], "E_m": [{ "mes": "Enero", "energia": 354.42 }, { "mes": "Febrero", "energia": 404.89 }, { "mes": "Marzo", "energia": 546.4 }, { "mes": "Abril", "energia": 562.42 }, { "mes": "Mayo", "energia": 652.9 }, { "mes": "Junio", "energia": 663.44 }, { "mes": "Julio", "energia": 748.68 }, { "mes": "Agosto", "energia": 733.23 }, { "mes": "Septiembre", "energia": 624.66 }, { "mes": "Octubre", "energia": 527.28 }, { "mes": "Noviembre", "energia": 362.64 }, { "mes": "Diciembre", "energia": 352.26 }], "H(i)_d": [{ "mes": "Enero", "energia": 3 }, { "mes": "Febrero", "energia": 3.82 }, { "mes": "Marzo", "energia": 4.76 }, { "mes": "Abril", "energia": 5.21 }, { "mes": "Mayo", "energia": 5.95 }, { "mes": "Junio", "energia": 6.44 }, { "mes": "Julio", "energia": 7.14 }, { "mes": "Agosto", "energia": 6.97 }, { "mes": "Septiembre", "energia": 5.99 }, { "mes": "Octubre", "energia": 4.72 }, { "mes": "Noviembre", "energia": 3.22 }, { "mes": "Diciembre", "energia": 2.99 }], "H(i)_m": [{ "mes": "Enero", "energia": 92.98 }, { "mes": "Febrero", "energia": 107.05 }, { "mes": "Marzo", "energia": 147.65 }, { "mes": "Abril", "energia": 156.25 }, { "mes": "Mayo", "energia": 184.43 }, { "mes": "Junio", "energia": 193.13 }, { "mes": "Julio", "energia": 221.46 }, { "mes": "Agosto", "energia": 216.02 }, { "mes": "Septiembre", "energia": 179.64 }, { "mes": "Octubre", "energia": 146.28 }, { "mes": "Noviembre", "energia": 96.55 }, { "mes": "Diciembre", "energia": 92.76 }], "SD_m": [{ "mes": "Enero", "energia": 87.95 }, { "mes": "Febrero", "energia": 83.64 }, { "mes": "Marzo", "energia": 93.83 }, { "mes": "Abril", "energia": 82.53 }, { "mes": "Mayo", "energia": 72.81 }, { "mes": "Junio", "energia": 33.6 }, { "mes": "Julio", "energia": 30.2 }, { "mes": "Agosto", "energia": 34.06 }, { "mes": "Septiembre", "energia": 40.32 }, { "mes": "Octubre", "energia": 63.78 }, { "mes": "Noviembre", "energia": 84.2 }, { "mes": "Diciembre", "energia": 55.84 }] })

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
          <Outlet context={{ reePriceEstimation, setReePriceEstimation, date, setDate, time0f, setTime0f, time0l, setTime0l, averagePrice, setAveragePrice, solarPVPriceEstimation, setSolarPVPriceEstimation, resultType, setResultType, resultDetails, setResultDetails, energyData, setEnergyData, technologyTypes }} />
        </Box>
      </Box>
    </Grid>
  );
}

export default App;
