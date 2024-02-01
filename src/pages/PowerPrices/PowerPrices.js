import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useOutletContext } from 'react-router-dom';
import CommonSwitch from '../../components/common/CommonSwitch/CommonSwitch';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CommonAlert from "../../components/common/CommonAlert/CommonAlert";
import CommonChartBar from "../../components/common/CommonChartBar/CommonChartBar";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import { fetchREEPrices } from "../../api"

const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

export const PowerPrices = () => {
  const [getPrices, setPrices] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { reePriceEstimation, setReePriceEstimation, date, setDate, dateLast, setDateLast, time0f, setTime0f, time0l, setTime0l, averagePrice, setAveragePrice } = useOutletContext();


  useEffect(() => {
    date !== undefined && (async () => {
      const response = await fetchREEPrices(date.format('YYYY-MM-DD'), dateLast.format('YYYY-MM-DD'), time0f.format('HH'), time0l.format('HH'));
      if (response?.error) {
        console.log(`error: ${JSON.stringify(response.error)}`);
        setErrorMessage(response.error);
        setPrices(null);
      } else {
        const pvpcValues = response.included.find(item => item.type === 'PVPC (€/MWh)');
        const pvpcPrices = pvpcValues.attributes.values.map((item, index) => ({ value: item.value, hour: new Date(item.datetime).getHours() < 10 ? `0${new Date(item.datetime).getHours()}` : `${new Date(item.datetime).getHours()}` }));
        const pvpcPricesFilterd = pvpcPrices.filter(item => item.hour >= time0f.format('HH') && item.hour <= time0l.format('HH'));
        const result = Object.values(pvpcPricesFilterd.reduce((acc, { hour, value }) => {
          const key = hour;
          acc[key] = acc[key] || { hour, values: [] };
          acc[key].values.push(value);
          acc[key].value = acc[key].values.reduce((avg, score) => avg + score / acc[key].values.length, 0);
          return acc;
        }, {})).map(({ values, ...obj }) => obj)
        const resultSorted = result.sort((a, b) => a.hour > b.hour ? 1 : -1)
        setAveragePrice(average(result.map(item => item.value)).toFixed(4));
        setPrices(resultSorted);
        setErrorMessage(null);
        reePriceEstimation && setReePriceEstimation(average(result.map(item => item.value)).toFixed(4));
      }
    })();
  }, [date, dateLast, time0f, time0l, reePriceEstimation, setAveragePrice, setReePriceEstimation]);

  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <Box>
          <CommonPaper title={"Precios [EUR/MWh]"} sx={{ ml: 10 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  //inputFormat="DD/MM/YYYY"
                  //views={["day", "month", "year"]}
                  label="Desde"
                  format="DD-MM-YYYY"
                  defaultValue={dayjs(date)}
                  sx={{ width: 200, mb: 2, ml: 4, }}
                  onChange={value => setDate(value)}
                />
                <DatePicker
                  //inputFormat="DD/MM/YYYY"
                  //views={["day", "month", "year"]}
                  label="Hasta"
                  format="DD-MM-YYYY"
                  defaultValue={dayjs(dateLast)}
                  sx={{ width: 200, mb: 2, ml: 4, }}
                  onChange={value => setDateLast(value)}
                />
                <TimePicker
                  label="Desde Hora"
                  //maxTime={maxTime0}
                  value={dayjs(time0f)}
                  views={['hours']}
                  onChange={value => setTime0f(value)}
                  sx={{ width: 200, mb: 2, ml: 2, mr: 2 }}
                  ampm={false}
                />
                <TimePicker
                  label="Hasta Hora"
                  //minTime={minTime1}
                  value={dayjs(time0l)}
                  //defaultValue={dayjs(time0l)}
                  onChange={value => setTime0l(value)}
                  views={['hours']}
                  sx={{ width: 200, mb: 2, }}
                  ampm={false}
                />
              </LocalizationProvider>
            </Box>
            {errorMessage ? <CommonAlert sx={{ ml: 4 }} title='Error' message={errorMessage} strongMessage='Contacte al administrador' /> :

              getPrices &&
              <Box>
                <Box sx={{ ml: 4, mt: 4 }}>
                  <Box sx={{ fontWeight: 500 }} display="inline">{`Precio medio: `}</Box>
                  <Box display="inline">{`${averagePrice} EUR`}</Box>
                  <CommonSwitch
                    label={"Vincular Precio al cálculo de hidrogeno"}
                    checked={reePriceEstimation}
                    onChange={() => {
                      setReePriceEstimation(reePriceEstimation ? false : averagePrice);
                    }}
                  />
                </Box>

                <CommonChartBar sx={{ m: 10 }}
                  data={getPrices}
                  maxValue={300}
                  valueField={'value'}
                  argumentField={'hour'}
                  isLineSeries
                />
              </Box>

            }
          </CommonPaper>
        </Box>

      </Grid>
    </Box>
  )
}