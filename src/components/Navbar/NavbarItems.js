import * as React from "react";
import PropaneIcon from "@mui/icons-material/Propane";
import Water from "@mui/icons-material/Water";
import SolarPower from "@mui/icons-material/SolarPower";
import Co2Icon from "@mui/icons-material/Co2";
import PriceCheck from "@mui/icons-material/PriceCheck";

export const userNavItemsTop = [
  {
    id: 0,
    icon: <PriceCheck />,
    label: "Precios Electricidad",
    route: "precios-REE"
  },
  {
    id: 1,
    icon: <SolarPower />,
    label: "Energía Solar",
    route: "energia-solar"
  },
];
export const userNavItemsBottom = [
  {
    id: 2,
    icon: <PropaneIcon />,
    label: "Hidrógeno",
    route: "H2"
  },
  {
    id: 3,
    icon: <Water />,
    label: "Consumo H2O",
    route: "H2O"
  },
  {
    id: 3,
    icon: <Co2Icon />,
    label: "Generación C02",
    route: "Co2"
  }
];