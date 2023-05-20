import React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const CommonSwitch = ({ label, checked, onChange, disabled, sx }) => {
  return (
    <Box>
      <FormControlLabel
        sx={sx}
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />}
        label={label} />
    </Box>
  );
};

export default CommonSwitch;