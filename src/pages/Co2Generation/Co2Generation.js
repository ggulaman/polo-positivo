import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";

export const Co2Generation = () => {

  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper title={"Generación Co2"} sx={{ ml: 10 }}>
          {`to be done`}
        </CommonPaper>
      </Grid>
    </Box>
  );
}