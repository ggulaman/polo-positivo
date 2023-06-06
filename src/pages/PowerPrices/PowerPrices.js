import React, { useEffect, useState } from "react";
import moment from 'moment';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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

  const [date, setDate] = useState(moment());
  const [time0f, setTime0f] = useState(moment().startOf('day'));
  const [time0l, setTime0l] = useState(moment().endOf('day'));
  const [averagePrice, setAveragePrice] = useState();

  // const fetchPrices = async () => {
  //   const response = await fetchREEPrices(date.format('DD/MM/YYYY'), time0f.format('HH'), time0l.format('HH'));
  //   if (response?.error) {
  //     console.log(`error: ${JSON.stringify(response.error)}`);
  //     setErrorMessage(response.error);
  //     setPrices(null);
  //   } else {
  //     console.log(`values ${JSON.stringify(response.included)}`);
  //     const pvpcValues = response.included.find(item => item.type === 'PVPC (€/MWh)');
  //     console.log(`values ${JSON.stringify(pvpcValues)}`);
  //     const pvpcPrices = pvpcValues.attributes.values.map((item, index) => ({ value: item.value, hour: index + parseInt(time0f.format('HH')) < 10 ? `0${index + parseInt(time0f.format('HH'))}` : `${index + parseInt(time0f.format('HH'))}` }));

  //     const result = Object.values(pvpcPrices.reduce((acc, { hour, value }) => {
  //       const key = hour;
  //       acc[key] = acc[key] || { hour, values: [] };
  //       acc[key].values.push(value);
  //       acc[key].value = acc[key].values.reduce((avg, score) => avg + score / acc[key].values.length, 0);
  //       return acc;
  //     }, {})).map(({ values, ...obj }) => obj)

  //     console.log(`result ${JSON.stringify(result)}`)

  //     setAveragePrice(average(result.map(item => item.value)));
  //     setPrices(pvpcPrices)
  //     setErrorMessage(null);
  //   }
  // }

  useEffect(() => {
    date !== undefined && (async () => {
      const response = await fetchREEPrices(date.format('DD/MM/YYYY'), time0f.format('HH'), time0l.format('HH'));
      if (response?.error) {
        console.log(`error: ${JSON.stringify(response.error)}`);
        setErrorMessage(response.error);
        setPrices(null);
      } else {
        console.log(`values ${JSON.stringify(response.included)}`);
        const pvpcValues = response.included.find(item => item.type === 'PVPC (€/MWh)');
        console.log(`values ${JSON.stringify(pvpcValues)}`);
        const pvpcPrices = pvpcValues.attributes.values.map((item, index) => ({ value: item.value, hour: index + parseInt(time0f.format('HH')) < 10 ? `0${index + parseInt(time0f.format('HH'))}` : `${index + parseInt(time0f.format('HH'))}` }));

        const result = Object.values(pvpcPrices.reduce((acc, { hour, value }) => {
          const key = hour;
          acc[key] = acc[key] || { hour, values: [] };
          acc[key].values.push(value);
          acc[key].value = acc[key].values.reduce((avg, score) => avg + score / acc[key].values.length, 0);
          return acc;
        }, {})).map(({ values, ...obj }) => obj)

        console.log(`result ${JSON.stringify(result)}`)

        setAveragePrice(average(result.map(item => item.value)));
        setPrices(pvpcPrices)
        setErrorMessage(null);
      }
    })();
  }, [date, time0f, time0l]);

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
                  label="Fecha Inicio"
                  format="DD-MM-YYYY"
                  defaultValue={dayjs(date)}
                  sx={{ width: 200, mb: 2, ml: 4, }}
                  onChange={value => setDate(value)}
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
                  <Box sx={{ fontWeight: 500 }} display="inline">{`Average Price: `}</Box>
                  <Box display="inline">{`${averagePrice.toFixed(4)} EUR`}</Box>
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