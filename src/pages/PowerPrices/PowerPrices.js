import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommonAlert from "../../components/common/CommonAlert/CommonAlert";
import CommonChartBar from "../../components/common/CommonChartBar/CommonChartBar";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import { fetchREEPrices } from "../../api"
//https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2023-05-22T00:00&end_date=2023-05-22T23:59&time_trunc=hour
export const PowerPrices = () => {
  const [getPrices, setPrices] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const response = await fetchREEPrices();
    if (response?.error) {
      console.log(`error: ${JSON.stringify(response.error)}`);
      setErrorMessage(response.error);
      setPrices(null);
    } else {
      const responsePriceItems = response.indicator.values.filter(item => item.geo_name === 'Península')
      const responsePrices = responsePriceItems.map((item, index) => {
        return ({ value: item.value, hour: index });
      });
      console.log(responsePrices)
      setPrices(responsePrices)
      setErrorMessage(null);
    }
  }

  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        {errorMessage ?
          <CommonAlert sx={{ ml: 4 }} title='Error' message={errorMessage} strongMessage='Contacte al administrador' /> :
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
        }

      </Grid>
    </Box>
  )
}