import * as React from "react";
import PropaneIcon from "@mui/icons-material/Propane";
import SolarPower from "@mui/icons-material/SolarPower";
import PriceCheck from "@mui/icons-material/PriceCheck";

export const userNavItems = [
  {
    id: 0,
    icon: <SolarPower />,
    label: "Energía Solar",
    route: "solar-power"
  },
  {
    id: 1,
    icon: <PropaneIcon />,
    label: "Hidrógeno",
    route: "hydrogen"
  },
  {
    id: 2,
    icon: <PriceCheck />,
    label: "Precios Electricidad",
    route: "power-prices"
  }
];