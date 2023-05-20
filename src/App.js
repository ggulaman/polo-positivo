import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PoloApp from "./PoloApp";

import Hydrogen from "./pages/Hydrogen";
import SolarPower from "./pages/SolarPower";
import { PowerPrices } from "./pages/PowerPrices";
import { dashboardTheme } from "./dashboardTheme";

const App = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      {/*<Provider store={store}>*/}|
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PoloApp />}>
            <Route path="hydrogen" element={<Hydrogen />} />
            <Route path="solar-power" element={<SolarPower />} />
            <Route path="power-prices" element={<PowerPrices />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*</Provider>*/}
    </ThemeProvider>
  );
}

export default App;