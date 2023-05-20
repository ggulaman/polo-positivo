import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CommonChartBar from "../components/common/CommonChartBar/CommonChartBar";
import CommonPaper from "../components/common/CommonPaper/CommonPaper";

export const PowerPrices = () => {
  const [getPrices, setPrices] = useState(null);
  const fetchPrices = () => {
    fetch(`https://api.esios.ree.es/indicators/1001`, {
      "method": "GET"
    }
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        const responsePriceItems = data.indicator.values.filter(item => item.geo_name === 'Península')
        const responsePrices = responsePriceItems.map((item, index) => {
          return ({ value: item.value, hour: index });
        });
        console.log(responsePrices)
        setPrices(responsePrices)
      })
  }
  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <Box>
      <CommonPaper title={"Precios [EUR/MWh]"} sx={{ ml: 10 }}>
        {getPrices && <CommonChartBar sx={{ m: 10 }}
          data={getPrices}
          maxValue={300}
          valueField={'value'}
          argumentField={'hour'}
          isLineSeries
        />
        }
      </CommonPaper>


    </Box>
  )
}