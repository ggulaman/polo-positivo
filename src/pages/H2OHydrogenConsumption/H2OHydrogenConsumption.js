import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import CommonSelect from "../../components/common/CommonSelect/CommonSelect";
import CommonInput from '../../components/common/CommonInput/CommonInput';

const H2Generation = () => {
  const { technologyTypes } = useOutletContext();
  const [energy, setEnergy] = useState(100);
  const [rejection, setRejection] = useState(5);
  const [tecnologyData, setTecnologyData] = useState(technologyTypes[0].name);

  const kgH2PerHour = (energy * 1000 / technologyTypes.find(item => item.name === tecnologyData).unitaryPowerCost).toFixed(2)

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Energía consumida"
          id="precioEnergía"
          sx={{ m: 1, width: '25ch' }}
          value={energy}
          onChange={(event) => setEnergy(event.target.value)}
          type="number"
          leftLabel='MWh'
        />

        <CommonInput
          label="Factor de Rechazo"
          id="precioEnergía"
          sx={{ m: 1, width: '25ch' }}
          value={rejection}
          helperText={'[1, ..., 50]'}
          onChange={(event) => {
            console.log(`rechazo: ${event.target.value}`)
            setRejection(prev => (event?.target.value >= 0 && event.target.value <= 50000) ? event.target.value : prev)
          }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          type="number"
          leftLabel='%'
        />
      </Box>
      <br />

      <Box>
        <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Tecnología`}</Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <CommonSelect
            sx={{ m: 1, width: '25ch' }}
            title='Tipo de hidrolizador'
            value={tecnologyData || technologyTypes[0].name}
            handleChange={event => setTecnologyData(event.target.value)}
            items={technologyTypes.map(item => item.name)}
            disabled={false}
          />
          <CommonInput
            label="Produccion de H2 por hora"
            id="precioEnergía"
            sx={{ m: 1, width: '25ch' }}
            value={kgH2PerHour}
            helperText={''}
            type="number"
            disabled={true}
            leftLabel='kg/h'
          />
        </Box>
      </Box>
      <br />
      <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Resultados`}</Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Consumo de agua para H2"
          id="consumoH2O"
          sx={{ m: 1, width: '25ch' }}
          value={kgH2PerHour * 9}
          helperText={''}
          type="number"
          disabled={true}
          leftLabel='l'
        />
        <CommonInput
          label="Agua de rechazo"
          id="precioEnergía"
          sx={{ m: 1, width: '25ch' }}
          value={(kgH2PerHour * 9 * (rejection / 100)).toFixed(2)}
          helperText={''}
          type="number"
          disabled={true} leftLabel='l'
        />
        <CommonInput
          label="Agua Total Consumida"
          id="precioEnergía"
          sx={{ m: 1, width: '25ch' }}
          value={(kgH2PerHour * 9 * (1 + rejection / 100)).toFixed(2)}
          helperText={''}
          type="number"
          disabled={true} leftLabel='l'
        />
      </Box>
    </Box>
  )
};


export const H2OHydrogenConsumption = () => {

  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper title={"Consumo Anual de H2O"} sx={{ ml: 10 }}>
          {H2Generation()}
        </CommonPaper>
      </Grid>
    </Box>
  );
}