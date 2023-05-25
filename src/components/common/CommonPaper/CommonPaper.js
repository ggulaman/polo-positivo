import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const CommonPaper = ({ title, children }) => {
  return (
    <Box>
      <Paper
        variant="outlined"
        square={true}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          //height: 300,
        }}
      >
        <Box sx={{ color: "#1976d2", mb: 5, fontWeight: "bold" }}>{title}</Box>
        {children}
      </Paper>
    </Box>
  );
};

export default CommonPaper;