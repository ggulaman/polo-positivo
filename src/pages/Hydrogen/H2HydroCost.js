import React from "react";
import Box from "@mui/material/Box";
import { useOutletContext } from 'react-router-dom';

import CommonSelect from "../../components/common/CommonSelect/CommonSelect";
import CommonInput from '../../components/common/CommonInput/CommonInput';



export const H2cost = () => {
  const { tecnologyData, setTecnologyData, energyCost, setEnergyCost, electVolume, setElectVolume, solarPVPriceEstimation, technologyTypes, reePriceEstimation } = useOutletContext();
  const technologyTypeNames = technologyTypes.map(item => item.name);

  // const [results, setResults] = useState({
  //   unitaryPriceH2: tecnologyData.unitaryPowerCost + tecnologyData.capex * (1 + tecnologyData.opex) / (electVolume.expectationOfLife * electVolume.hourPerYearConsumption),
  //   capexTotal: electVolume.electroPower * tecnologyData.capex,
  //   opexAnual: electVolume.electroPower * tecnologyData.capex * tecnologyData.opex,
  //   anualEnergyCost: electVolume.electroPower * electVolume.hourPerYearConsumption * energyCost.totalPriceCost
  // });

  const handleTecnologyChange = event => {
    const { capex, opex, unitaryPowerCost } = technologyTypes.find(tech => tech.name === event);
    setTecnologyData({
      tecnology: event,
      capex,
      opex,
      unitaryPowerCost,
      unitaryPowerCostH2: energyCost.totalPriceCost / unitaryPowerCost / 1000,
      annualH2Production: electVolume.anualProduction * 1000 / unitaryPowerCost
    })
  }

  const handleVolumeElect = ({ target: { value, id } }) => {
    value = parseFloat(value);

    setElectVolume(prev => {
      if (id === 'electroPower' && value > 0 && value < 100) {
        return ({ ...prev, electroPower: value, anualProduction: value * prev.hourPerYearConsumption })
      } else if (id === 'hourPerYearConsumption' && value > 0 && value < 8760) {
        return ({ ...prev, hourPerYearConsumption: value, anualProduction: value * prev.electroPower })
      } else if (id === 'expectationOfLife' && value >= 0 && value <= 100) {
        return ({ ...prev, expectationOfLife: value })
      }
      return prev;
    })
  }

  const handleEnergyCost = ({ target: { value, id } }) => {
    value = parseFloat(value);

    setEnergyCost(prev => {
      if (id === 'solarPowerPrice') {

        return ({ ...prev, solarPowerPrice: value, totalPriceCost: value * prev.solarPowerWeight / 100 + prev.gridPowerPrice * prev.gridPowerWeight / 100 })
      } else if (id === 'gridPowerPrice') {
        return ({ ...prev, gridPowerPrice: value, totalPriceCost: prev.solarPowerPrice * prev.solarPowerWeight / 100 + value * prev.gridPowerWeight / 100 })
      } else if (id === 'solarPowerWeight' && value >= 0 && value <= 100) {
        return ({ ...prev, solarPowerWeight: value, gridPowerWeight: 100 - value, totalPriceCost: prev.solarPowerPrice * value / 100 + prev.gridPowerPrice * (100 - value) / 100 })
      } else if (id === 'gridPowerWeight' && value >= 0 && value <= 100) {
        console.log(`valor is: ${(prev.solarPowerPrice * (100 - value) / 100) + (prev.gridPowerPrice * value / 100)}`);
        return ({ ...prev, solarPowerWeight: 100 - value, gridPowerWeight: value, totalPriceCost: (prev.solarPowerPrice * (100 - value) / 100) + (prev.gridPowerPrice * value / 100) })
      }
      return prev;
    })

    handleTecnologyChange(tecnologyData.tecnology);

  }

  return (
    <Box>
      <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Coste de la Energía`}</Box>
      <br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Precio Energía Fotovoltaica"
          id="solarPowerPrice"
          sx={{ m: 1, width: '25ch' }}
          value={(solarPVPriceEstimation ? solarPVPriceEstimation : (energyCost && energyCost.solarPowerPrice)) || 0}
          helperText={'Coste Energía Fotovoltaica'}
          onChange={handleEnergyCost}
          leftLabel='EUR/MWh'
          type="number"
          disabled={solarPVPriceEstimation}

        />
        <CommonInput
          label="Precio Energía Red"
          id="gridPowerPrice"
          sx={{ m: 1, width: '25ch' }}
          value={(reePriceEstimation ? reePriceEstimation : (energyCost && energyCost.gridPowerPrice)) || 0}
          helperText={'Coste Energía Red'}
          onChange={handleEnergyCost}
          leftLabel='EUR/MWh'
          type="number"
          disabled={reePriceEstimation}
        />
      </Box>
      <br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Peso Energía Fotovoltaica"
          id="solarPowerWeight"
          sx={{ m: 1, width: '25ch' }}
          value={(energyCost && energyCost.solarPowerWeight) || 0}
          helperText={'% Energía Fotovoltaica'}
          onChange={handleEnergyCost}
          leftLabel='%'
          type="number"
        />
        <CommonInput
          label="Peso Energía de la Red"
          id="gridPowerWeight"
          sx={{ m: 1, width: '25ch' }}
          value={(energyCost && energyCost.gridPowerWeight) || 0}
          helperText={'% Energía Red'}
          onChange={handleEnergyCost}
          leftLabel='%'
          type="number"
        />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Precio Energía"
          id="powerPrice"
          sx={{ m: 1, width: '25ch' }}
          value={(energyCost && energyCost.totalPriceCost.toFixed(2)) || 0}
          helperText={'Precio Energía'}
          variant='filled'
          disabled
          leftLabel='EUR/MWh'
          type="number"
        />
      </Box>
      <br />
      <br />
      <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Volumen Electrolizador`}</Box>
      <br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>

        <CommonInput
          label="Potencia Electrolizador"
          id="electroPower"
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume && electVolume.electroPower) || 0}
          helperText={''}
          onChange={handleVolumeElect}
          leftLabel='MW'
        />
        <CommonInput
          label="Horas anuales de uso"
          id="hourPerYearConsumption"
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume && electVolume.hourPerYearConsumption) || 0}
          helperText={''}
          onChange={handleVolumeElect}
          leftLabel='h'
        />
        <CommonInput
          label="Vida Util"
          id="expectationOfLife"
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume && electVolume.expectationOfLife) || 0}
          helperText={''}
          onChange={handleVolumeElect}
          leftLabel='años'
        />
        <CommonInput
          label="Producción anual"
          id="gridPowerPrice"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume && electVolume.anualProduction.toFixed(2)) || 0}
          helperText={''}
          leftLabel='MW'
        />
      </Box>
      <br />
      <br />
      <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Tecnología`}</Box>
      <br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonSelect
          sx={{ m: 1, width: '25ch' }}
          title='Tecnología'
          value={tecnologyData.tecnology || technologyTypes[0].name}
          defaultValue={tecnologyData.tecnology}
          handleChange={event => handleTecnologyChange(event.target.value)}
          items={technologyTypeNames}
          disabled={false}
        />
        <CommonInput
          label="Energía para generar 1kg de h2"
          id="capex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={tecnologyData.unitaryPowerCost.toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='kWh/kg'
        />
        <CommonInput
          label="Precio generación 1 kg de H2"
          id="capex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(tecnologyData.unitaryPowerCostH2).toFixed(6) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR/kg'
        />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="CAPEX 1 MWh"
          id="capex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={tecnologyData.capex.toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR/MW'
        />
        <CommonInput
          label="OPEX 1 MWh Anual"
          id="opex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={tecnologyData.opex.toFixed(4) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR/MW'
        />
        <CommonInput
          label="Producción anual de H2"
          id="opex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume.anualProduction * 1000 / tecnologyData.unitaryPowerCost).toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='kg'
        />
      </Box>
      <br />
      <br />
      <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Resultados`}</Box>
      <br />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <CommonInput
          label="Precio Unitario de Produccion H2"
          id="unitaryPriceH2"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          //value={(tecnologyData.unitaryPowerCostH2 + tecnologyData.capex * electVolume.electroPower / (electVolume.expectationOfLife * tecnologyData.anualProduction) + (tecnologyData.capex * tecnologyData.opex) / (tecnologyData.annualH2Production)).toFixed(4) || null}
          value={(
            tecnologyData.unitaryPowerCostH2
            + (tecnologyData.capex * electVolume.electroPower / (electVolume.expectationOfLife * (electVolume.anualProduction * 1000 / tecnologyData.unitaryPowerCost)))
            + (tecnologyData.capex * electVolume.electroPower * tecnologyData.opex / (electVolume.anualProduction * 1000 / tecnologyData.unitaryPowerCost))
          ).toFixed(6)
            || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR/kg'
          type="number"
        />
        <CommonInput
          label="Capex Total"
          id="opex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume.electroPower * tecnologyData.capex).toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR'
          type="number"
        />
        <CommonInput
          label="Opex Anual"
          id="opex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume.electroPower * tecnologyData.capex * tecnologyData.opex).toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR'
        />
        <CommonInput
          label="Coste Energía"
          id="opex"
          variant="filled"
          disabled
          sx={{ m: 1, width: '25ch' }}
          value={(electVolume.electroPower * electVolume.hourPerYearConsumption * energyCost.totalPriceCost).toFixed(2) || null}
          helperText={''}
          onChange={() => null}
          leftLabel='EUR'
        />
      </Box>
    </Box>)
};

