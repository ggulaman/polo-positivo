import React from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const CommonInput = ({ label, id, value, variant = undefined, onChange, error, leftLabel, disabled, helperText, sx = { m: 1, width: '30ch' } }) => {
  return (
    <Box>
      <TextField
        error={error}
        variant={variant}
        label={label}
        value={value}
        id={id}
        sx={sx}
        onChange={(event) => onChange(event)}
        disabled={disabled}
        helperText={helperText}
        InputProps={{
          startAdornment: <InputAdornment position="start">{leftLabel}</InputAdornment>,
        }}
      />
    </Box>
  );
};

export default CommonInput;