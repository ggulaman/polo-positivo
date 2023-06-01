import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PoloApp from "./PoloApp";

import { PowerPrices, SolarPower, Hydrogen } from "./pages";
import { dashboardTheme } from "./dashboardTheme";

const App = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      {/*<Provider store={store}>*/}|
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PoloApp />}>
            <Route path="power-prices" element={<PowerPrices />} />
            <Route path="solar-power" element={<SolarPower />} />
            <Route path="hydrogen" element={<Hydrogen />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*</Provider>*/}
    </ThemeProvider>
  );
}

export default App;