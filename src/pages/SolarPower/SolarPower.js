import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import CommonAlert from "../../components/common/CommonAlert/CommonAlert";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import CommonSelect from "../../components/common/CommonSelect/CommonSelect";
import CommonButton from "../../components/common/CommonButton/CommonButton";
import CommonInput from '../../components/common/CommonInput/CommonInput';
import CommonSwitch from '../../components/common/CommonSwitch/CommonSwitch';
import CommonChartBar from '../../components/common/CommonChartBar/CommonChartBar';
import { fetchSolarData } from '../../api'

import { validateDegrees, validateDegreesBtw0and90, validatePositiveNumber, validateIntBetween0and100 } from "../../utils/getValidators";

const resultTypes = [
  { desc: 'Energia media diaria [kWh]', units: 'kWh/dia', id: 'E_d' },
  { desc: 'Energia media mensual [kWh]', units: 'kWh/mes', id: 'E_m' },
  { desc: 'Media diaria de irradiacion [kWh/m2]', units: 'kWh/m2/dia', id: 'H(i)_d' },
  { desc: 'Media mensual de irradiacion [kWh/m2]', units: 'kWh/m2/mes', id: 'H(i)_m' },
  { desc: 'Desviacion estandar entre producion mensual y anual [kWh]', units: 'kWh/mes', id: 'SD_m' },
]
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const mountingPositionOptions = ['Anclaje libre', 'Integradas al Tejado'];

export const SolarPower = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [resultDetails, setResultDetails] = useState(null)
  //const [energyData, setEnergyData] = useState(null)
  const [latitud, setLatitud] = useState(42)
  const [longitud, setLongitud] = useState(-3.310)
  const [peakPower, setPeakPower] = useState(4.5)
  const [loss, setLoss] = useState(14)
  const [slope, setSlope] = useState(35)
  const [azimut, setAzimit] = useState(1)
  const [fixType, setFixType] = useState(mountingPositionOptions[0])
  const [optSlope, setOptSlope] = useState(false)
  const [optSlopeAndAzimut, setOptSlopeAndAzimut] = useState(false)
  const [isLatitudError, setIsLatitudError] = useState(false)
  const [isLongitudError, setIsLongitudError] = useState(false)
  const [isPeakPowerError, setIsPeakPowerError] = useState(false)
  const [isLossError, setIsLossError] = useState(false)
  const [isSlopeError, setIsSlopeError] = useState(false)
  const [isAzimutError, setIsAzimutError] = useState(false)

  const [optPVPrice, setOptPVPrice] = useState(true)
  const [pvSystemPrice, setPvSystemPrice] = useState(6000)
  const [interest, setInterest] = useState(2)
  const [lifeTime, setLifeTime] = useState(10)
  //const [resultType, setResultType] = useState(resultTypes[0].desc)

  const { solarPVPriceEstimation, setSolarPVPriceEstimation, resultType, setResultType, resultDetails, setResultDetails, energyData, setEnergyData } = useOutletContext();

  const fetchData = async () => {
    const response = await fetchSolarData({ latitud, longitud, peakPower, loss, fixType, optSlopeAndAzimut, optSlope, azimut, slope, optPVPrice, pvSystemPrice, interest, lifeTime });
    if (response?.error) {
      console.log(`error: ${JSON.stringify(response.error)}`)
      setResultDetails(null);
      setEnergyData(null)
      setErrorMessage(response.error);
    } else {
      const resultDetails = { ...response.inputs.location, ...response.inputs.mounting_system, ...response.outputs.totals.fixed };
      const energyResults = {};
      resultTypes.forEach(resultItem => {
        energyResults[resultItem.id] = response.outputs.monthly.fixed.map(month => { return { mes: months[month.month - 1], energia: month[resultItem.id] } });
      });

      setResultDetails(resultDetails);
      setEnergyData(energyResults)
    }
    setIsLoading(false)
  };

  const solarParameters = () =>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <CommonInput
        label="Latitud"
        id="latitud"
        sx={{ m: 1, width: '25ch' }}
        value={latitud}
        helperText={'[-90, ..., 90]'}
        error={isLatitudError}
        onChange={({ target: { value } }) => {
          setIsLatitudError(!validateDegrees(value))
          setLatitud(value)
        }}
        leftLabel='°'
      />
      <CommonInput
        label="Longitud"
        id="longitud"
        sx={{ m: 1, width: '25ch' }}
        value={longitud}
        helperText={'[-90, ..., 90]'}
        error={isLongitudError}
        onChange={({ target: { value } }) => {
          setIsLongitudError(!validateDegrees(value))
          setLongitud(value);
        }}
        leftLabel='°'

      />
      <CommonInput
        label="Potencia Pico Instalada"
        id="potencia-pico"
        sx={{ m: 1, width: '25ch' }}
        value={peakPower}
        helperText={'[0, ...]'}
        error={isPeakPowerError}
        onChange={({ target: { value } }) => {
          setIsPeakPowerError(!validatePositiveNumber(value))
          setPeakPower(value);
        }}
        leftLabel='kWp'
      />
      <CommonInput
        label="Pérdidas"
        id="perdidas"
        sx={{ m: 1, width: '25ch' }}
        value={loss}
        helperText={'[0, ..., 100]'}
        error={isLossError}
        onChange={({ target: { value } }) => {
          setIsLossError(!validateIntBetween0and100(value))
          setLoss(value);
        }}
        leftLabel='%'
      />
    </Box>;

  const priceCalculation = () =>
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonSwitch
          label={"Calcular Precio"}
          checked={optPVPrice}
          onChange={() => {
            setOptPVPrice(!optPVPrice);
          }}
          sx={{ ml: 1 }}
        />
        {
          optPVPrice &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <CommonInput
              label="Coste Total Instalación"
              id="pvSystemPrice"
              sx={{ ml: 1, mr: 1, mt: -1, mb: 2, width: '25ch' }}
              value={pvSystemPrice}
              helperText={''}
              error={isLossError}
              onChange={({ target: { value } }) => {
                setPvSystemPrice(value);
              }}
              leftLabel='EUR'
            />
            <CommonInput
              label="Interes anual"
              id="interest"
              sx={{ ml: 1, mr: 1, mt: -1, mb: 2, width: '25ch' }}
              value={interest}
              helperText={''}
              error={isLossError}
              onChange={({ target: { value } }) => {
                setInterest(value);
              }}
              leftLabel='%'
            />
            <CommonInput
              label="Esperanza Vida Útil"
              id="lifetime"
              sx={{ ml: 1, mr: 1, mt: -1, mb: 2, width: '25ch' }}
              value={lifeTime}
              helperText={''}
              error={isLossError}
              onChange={({ target: { value } }) => {
                setLifeTime(value);
              }}
              leftLabel='años'
            />
          </Box>
        }
      </Box>
    </Box>

  const fixedMountingOptions = () =>
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Pendiente"
          sx={{ m: 1, width: '25ch' }}
          id="input-pendient"
          value={slope}
          helperText={'[0, ..., 90]'}
          error={isSlopeError}
          onChange={({ target: { value } }) => {
            setIsSlopeError(!validateDegreesBtw0and90(value))
            setSlope(value);
          }}
          leftLabel='°'
          disabled={optSlopeAndAzimut | optSlope}
        />
        <CommonInput
          label="Acimut"
          sx={{ m: 1, width: '25ch' }}
          id="input-acimut"
          value={azimut}
          helperText={'[0, ..., 90]'}
          error={isAzimutError}
          onChange={({ target: { value } }) => {
            setIsAzimutError(!validateDegreesBtw0and90(value))
            setAzimit(value);
          }}
          leftLabel='°'
          disabled={optSlopeAndAzimut}
        />

        <CommonSelect
          sx={{ m: 1, width: '25ch' }}
          title='Opciones de anclaje'
          value={fixType}
          defaultValue={fixType}
          handleChange={event => setFixType(event.target.value)}
          items={mountingPositionOptions}
          disabled={false}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Grid item  >
          <CommonSwitch
            label={"Optimizar pendiente"}
            checked={optSlope}
            onChange={() => {
              setOptSlope(!optSlope);
              setOptSlopeAndAzimut(false);
            }}
            sx={{ ml: 1 }}
          />
          <CommonSwitch
            label={"Optimizar pendiente y acimut"}
            checked={optSlopeAndAzimut}
            onChange={() => {
              setOptSlope(false);
              setOptSlopeAndAzimut(!optSlopeAndAzimut)
            }}
            sx={{ ml: 1 }}
          />
        </Grid>
      </Box>
    </Box>;

  const getResultData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box sx={{ ml: 1, mt: -2, fontWeight: 600 }}>
            Datos de localizacion:
          </Box>
          <Box sx={{ ml: 1, mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline">{`Latitud: `}</Box>
            <Box display="inline">{`${resultDetails.latitude} °`}</Box>
          </Box>
          <Box sx={{ ml: 1, mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Longitud: `}</Box>
            <Box display="inline">{`${resultDetails.longitude} °`}</Box>
          </Box>
          <Box sx={{ ml: 1, mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Elevacion: `}</Box>
            <Box display="inline">{`${resultDetails.elevation} m`}</Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          {/* <Box sx={{ m: 2 }} /> */}
          <Box sx={{ mt: -2, fontWeight: 600 }}>
            Datos de instalación:
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline">{`Pendiente: `}</Box>
            <Box display="inline">{`${resultDetails.fixed.slope.value} ° `}</Box>
            {resultDetails.fixed.slope.optimal && <Box display="inline">{` (optimo)`}</Box>}
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Acimut: `}</Box>
            <Box display="inline">{`${resultDetails.fixed.azimuth.value} ° `}</Box>
            {resultDetails.fixed.azimuth.optimal && <Box display="inline">{` (optimo)`}</Box>}
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ mt: -2, fontWeight: 600 }}>
            Datos de generación:
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline">{`Energía media diaria: `}</Box>
            <Box display="inline">{`${resultDetails.E_d} kWh/dia `}</Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Energía media mensual: `}</Box>
            <Box display="inline">{`${resultDetails.E_m} kWh/mes `}</Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Energía media anual: `}</Box>
            <Box display="inline">{`${resultDetails.E_y} kWh/año `}</Box>
          </Box>
          {resultDetails.LCOE_pv && <Box sx={{ mt: 1 }}>
            <Box sx={{ fontWeight: 500 }} display="inline" >{`Coste Energía Fotovoltaica: `}</Box>
            <Box display="inline">{`${resultDetails.LCOE_pv} EUR/kWh`}</Box>
          </Box>
          }
        </Grid>
      </Grid>
    )
  }
  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper
          title={"Parametros"}
        >
          {solarParameters()}
        </CommonPaper>
        <CommonPaper
          title={"Opciones de Montaje"}
        >
          {fixedMountingOptions()}
        </CommonPaper>
        <CommonPaper
          title={"Calcular Precio de Electricidad"}
        >
          {priceCalculation()}
        </CommonPaper>
        <CommonPaper
        >
          <CommonButton
            variant="contained"
            onClick={() => {
              console.log(`resultDetails: ${JSON.stringify(resultDetails)}`);
              console.log(`resultDetails: ${JSON.stringify(energyData)}`);
              setErrorMessage(null);
              setIsLoading(true);
              setEnergyData(null);
              setResultDetails(null);
              setSolarPVPriceEstimation(false);
              fetchData();
            }}
            color='primary'
            disabled={(optPVPrice && (!pvSystemPrice || !interest || !lifeTime)) || isLatitudError || isLongitudError || isPeakPowerError || isLossError || (optSlope ? isAzimutError : optSlopeAndAzimut ? false : isSlopeError || isAzimutError)}
            sx={{ width: 200, marginLeft: "0px", marginTop: "0px" }}
          >
            Resultados
          </CommonButton>
        </CommonPaper>
      </Grid>
      {energyData !== null ?
        <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
          <CommonPaper title={"Resultados [kWh] [mes]"}>

            <Box>
              {getResultData()}
              <Box sx={{ mb: 4 }}></Box>
              <br />
              {resultDetails.LCOE_pv && <CommonSwitch
                label={"Vincular Precio al cálculo de hidrogeno"}
                checked={solarPVPriceEstimation}
                onChange={() => {
                  setSolarPVPriceEstimation(solarPVPriceEstimation ? false : 1000 * resultDetails.LCOE_pv);
                }}
              />
              }
              <br />
              <CommonSelect
                sx={{ m: 1, width: '75ch' }}
                title='Resultados a mostrar'
                value={resultType}
                defaultValue={resultTypes[0].desc}
                handleChange={event => {
                  setResultType(event.target.value);
                }}
                items={resultTypes.map(item => item.desc)}
                disabled={false}
              />
              <br />
              {resultTypes.find(item => item?.desc === resultType)?.units}
              <CommonChartBar
                data={energyData[resultTypes.find(item => item?.desc === resultType)?.id]}
                valueField={'energia'}
                argumentField={'mes'}
              />
            </Box>

          </CommonPaper>
        </Grid> : isLoading ? <CircularProgress disableShrink sx={{ ml: 4 }} /> : errorMessage ? <CommonAlert sx={{ ml: 4 }} title='Error' message={errorMessage} strongMessage='Ejecutelo en local' /> : ''
      }
    </Box >
  );
};