import React from "react";
import Box from "@mui/material/Box";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  LineSeries
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const CommonChartBar = ({ data, maxValue, valueField, argumentField, title, sx, isLineSeries = false }) => {
  return (
    <Box sx={sx}>
      <Chart
        data={data}
      >
        <ArgumentAxis endAxisValue={24} />
        <ValueAxis max={maxValue} endAxisValue={24} />
        {
          !isLineSeries ?
            <BarSeries
              valueField={valueField}
              argumentField={argumentField}
            />
            :
            <LineSeries
              valueField={valueField}
              argumentField={argumentField}
            />

        }

        {title && <Title text={title} />}

        <Animation />
      </Chart>
    </Box>
  );
};

export default CommonChartBar;