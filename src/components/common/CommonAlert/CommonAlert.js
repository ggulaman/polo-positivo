import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const CommonAlert = ({ severity = 'error', title, message, strongMessage, sx, ...props }) => {
  return (
    <Alert severity="error" sx={sx} {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {`${message}${message && strongMessage ? ' - ' : ''}`}<strong>{strongMessage && strongMessage}</strong>
    </Alert>
  );
};

export default CommonAlert;