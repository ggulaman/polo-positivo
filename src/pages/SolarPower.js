import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';

import CommonPaper from "../components/common/CommonPaper/CommonPaper";
import CommonSelect from "../components/common/CommonSelect/CommonSelect";
import CommonButton from "../components/common/CommonButton/CommonButton";
import CommonInput from '../components/common/CommonInput/CommonInput';
import CommonSwitch from '../components/common/CommonSwitch/CommonSwitch';
import CommonChartBar from '../components/common/CommonChartBar/CommonChartBar';

import { validateDegrees, validateDegreesBtw0and90, validatePositiveNumber, validateIntBetween0and100 } from "../utils/getValidators";
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const mountinPositionOptions = ['Anclaje libre', 'Integradas al Tejado'];

const SolarPower = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [resultDetails, setResultDetails] = useState(null)
  const [energyData, setEnergyData] = useState(null)
  const [latitud, setLatitud] = useState(42)
  const [longitud, setLongitud] = useState(-3.310)
  const [peakPower, setPeakPower] = useState(4.5)
  const [loss, setLoss] = useState(14)
  const [slope, setSlope] = useState(35)
  const [azimut, setAzimit] = useState(1)
  const [fixType, setFixType] = useState(mountinPositionOptions[0])
  const [optSlope, setOptSlope] = useState(false)
  const [optSlopeAndAzimut, setOptSlopeAndAzimut] = useState(false)
  const [isLatitudError, setIsLatitudError] = useState(false)
  const [isLongitudError, setIsLongitudError] = useState(false)
  const [isPeakPowerError, setIsPeakPowerError] = useState(false)
  const [isLossError, setIsLossError] = useState(false)
  const [isSlopeError, setIsSlopeError] = useState(false)
  const [isAzimutError, setIsAzimutError] = useState(false)
  const fetchResultsData = () => {
    fetch(`/api/v5_2/PVcalc?outputformat=json&lat=${latitud}&lon=${longitud}&raddatabase=PVGIS-SARAH2&browser=0&peakpower=${peakPower}&loss=${loss}&mountingplace=${fixType === 'Anclaje libre' ? 'free' : 'building'}&pvtechchoice=crystSi&${optSlopeAndAzimut ? 'optimalangles=1' : optSlope ? `optimalinclination=1&aspect=${azimut}` : `angle=${slope}&aspect=${azimut}`}&usehorizon=1&userhorizon=&js=1`, {
      "method": "GET"
    }
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('outout: ' + JSON.stringify(data))
        const resultDetails = { ...data.inputs.location, ...data.inputs.mounting_system, ...data.outputs.totals.fixed };

        const energyResults = data.outputs.monthly.fixed.map(month => { return { mes: months[month.month - 1], energia: month.E_m } })

        //console.log(energyResults)
        console.log(resultDetails)
        setResultDetails(resultDetails);
        setEnergyData(energyResults)
        setIsLoading(false)

      })
  }

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
          items={mountinPositionOptions}
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
        </Grid>
      </Grid>
    )
  }
  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper
          title={"Parameters"}
        >
          {solarParameters()}
        </CommonPaper>
        <CommonPaper
          title={"Opciones de Montaje"}
        >
          {fixedMountingOptions()}
        </CommonPaper>
        <CommonPaper
        >
          <CommonButton
            variant="contained"
            onClick={() => {
              setIsLoading(true);
              setEnergyData(null);
              setResultDetails(null);
              fetchResultsData();
            }}
            color='primary'
            disabled={isLatitudError || isLongitudError || isPeakPowerError || isLossError || (optSlope ? isAzimutError : optSlopeAndAzimut ? false : isSlopeError || isAzimutError)}
            sx={{ width: 200, marginLeft: "0px", marginTop: "0px" }}
          >
            Resultados
          </CommonButton>
        </CommonPaper>
      </Grid>

      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper title={"Resultados [kWh] [mes]"}>
          {

            energyData !== null ?
              <Box>
                {getResultData()}
                <Box sx={{ mb: 4 }}></Box>
                <CommonChartBar
                  data={energyData}
                  //maxValue={100}
                  valueField={'energia'}
                  argumentField={'mes'}
                />
              </Box> : isLoading && <CircularProgress disableShrink />
          }
        </CommonPaper>
      </Grid>
    </Box >
  );
};

export default SolarPower;