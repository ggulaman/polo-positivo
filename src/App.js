import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PoloApp from "./PoloApp";

import { PowerPrices, SolarPower, Hydrogen, H2OHydrogenConsumption, Co2Generation } from "./pages";
import { dashboardTheme } from "./dashboardTheme";

const App = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      {/*<Provider store={store}>*/}|
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PoloApp />}>
            <Route path="precios-REE" element={<PowerPrices />} />
            <Route path="energia-solar" element={<SolarPower />} />
            <Route path="H2" element={<Hydrogen />} />
            <Route path="H2O" element={<H2OHydrogenConsumption />} />
            <Route path="Co2" element={<Co2Generation />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*</Provider>*/}
    </ThemeProvider>
  );
}

export default App;