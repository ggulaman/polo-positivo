import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CommonSelect = ({ title, handleChange, items, value, disabled, sx }) => {
  return (
    <Box>
      <FormControl fullWidth sx={{ ...sx }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId={`${title}-label`}
          id={title}
          value={value}
          label={title}
          onChange={handleChange}
          disabled={disabled}
        >
          {items.map((item, index) =>
            <MenuItem value={item} key={index}>{item}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CommonSelect;