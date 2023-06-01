import * as React from "react";
import PropaneIcon from "@mui/icons-material/Propane";
import SolarPower from "@mui/icons-material/SolarPower";
import PriceCheck from "@mui/icons-material/PriceCheck";

export const userNavItemsTop = [
  {
    id: 0,
    icon: <PriceCheck />,
    label: "Precios Electricidad",
    route: "power-prices"
  },
  {
    id: 1,
    icon: <SolarPower />,
    label: "Energía Solar",
    route: "solar-power"
  },
];
export const userNavItemsBottom = [
  {
    id: 2,
    icon: <PropaneIcon />,
    label: "Hidrógeno",
    route: "hydrogen"
  }
];