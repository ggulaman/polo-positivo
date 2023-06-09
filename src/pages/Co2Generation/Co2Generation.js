import React, { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useOutletContext } from 'react-router-dom';
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import CommonSelect from "../../components/common/CommonSelect/CommonSelect";
import CommonInput from '../../components/common/CommonInput/CommonInput';
const technologyTypes = ['PEM', 'Alcalina', 'SOEC'];


const co2Details = { h2: { energy: 38.58} , gn: { energy: 14.69, kgm3: 0.828}}

export const Co2Generation = () => {
  const { electVolume, tecnologyData, technologyTypes } = useOutletContext();

 const [energyPrice, setEnergyPrice] = useState(null)
 const [gnVolume, setGnVolume] = useState(10000);
 const [priceCo2, setPriceCo2] = useState(80);
 const [mixVolume, setMixVolume] = useState(100);
 const [mixGnper, setMixGnper] = useState(98);
const [mixH2per, setMixH2per] = useState(2);

 
 const EmisionEstimation = () =>
 <Box sx={{
   display: 'flex',
   //flexDirection: 'column',
 }}>
   <Box>
     <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Balance Energético`}</Box>

     <Box sx={{
       display: 'flex',
       flexDirection: 'column',
     }}>

       <CommonInput
         label="Produccion anual H2"
         id="H2weight"
         sx={{ m: 1, width: '25ch' }}
         value={(electVolume.anualProduction * 1000 / tecnologyData.unitaryPowerCost).toFixed(2) || null}
         helperText={''}
         leftLabel='kg H2'
         variant='filled'
         disabled={true}
       />
       <CommonInput
         label="Cantidad anual de Gas Natural"
         id="H2weight"
         sx={{ m: 1, width: '25ch' }}
         value={gnVolume * co2Details.gn.kgm3}
         helperText={''}
         leftLabel='Kg Gas'
         disabled={true}
         variant='filled'
       />
       <CommonInput
         label="Volumen consumido de de Gas Natural"
         id="H2weight"
         sx={{ m: 1, width: '25ch' }}
         value={gnVolume}
         leftLabel='m3 GN'
         onChange={({ target: { value }}) => setGnVolume(value)}
         type='number'
       />
     </Box>

     <br />

     <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Blending [Vol]`}</Box>

     <Box sx={{
       display: 'flex',
       flexDirection: 'column',
     }}>

       <CommonInput
         label=""
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={mixH2per}
         onChange={({target: {value }}) => {
          if(value >= 0 && value <= 100 ){
            setMixGnper(100 - value);
            setMixH2per(value);
          }
        }}
        leftLabel='% H2'
         type='number'
       />
       <CommonInput
         label=""
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={mixGnper}
         onChange={({target: {value }}) => {
          if(value >= 0 && value <= 100 ){
            setMixGnper(value);
            setMixH2per(100 - value);
          }
        }
        }
         leftLabel='% GN'
         type='number'
       />
      <CommonInput

         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={mixVolume}
         label={'Volumen Total Mezcla'}
         onChange={({target: {value }}) => setMixVolume(value)}
         leftLabel='m3'
         type='number'
       />
     </Box>
   </Box>
   <Box sx={{ ml: 8 }}>
     <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{'Energía'}</Box>
     <Box sx={{
       display: 'flex',
       flexDirection: 'column',
     }}>

       <CommonInput
         label=""
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={(co2Details.h2.energy * electVolume.anualProduction * 1000 / tecnologyData.unitaryPowerCost).toFixed(2) || null}
         helperText={''}
         disabled={true}
         variant='filled'
         leftLabel='kWh'
       />
       <CommonInput
         label=""
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={ (co2Details.gn.energy *  gnVolume * co2Details.gn.kgm3).toFixed(2) || null}
         disabled={true}
         variant='filled'
         leftLabel='kWh'
       />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <CommonInput
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={(((mixVolume*0.09*38.58*mixH2per)+(mixVolume*14.69*mixGnper))/100).toFixed(2)}
         disabled={true}
         variant={'filled'}
         leftLabel='kWh'
       />
     </Box>
   </Box>
   <Box sx={{ ml: 8 }}>
     <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Emisiones`}</Box>
     <Box sx={{
       display: 'flex',
       flexDirection: 'column',
     }}>

       <Box sx={{ mt: 3, mb: 3.5, ml: 1, fontWeight: "bold" }}>{`0 kgH2`}</Box>
       <Box sx={{
         display: 'flex',
         flexDirection: 'row',
       }}>
         <CommonInput
           label=""
           id="precioEnergía"
           sx={{ m: 1, width: '25ch' }}
           value={ (10.52 * 1.97 *  gnVolume  ).toFixed(2) || null}
           helperText={''}
           leftLabel='kg CO2'
           variant={'filled'}
           disabled={true}
         />
         <CommonInput
           label=""
           id="precioEnergía"
           sx={{ m: 1, width: '25ch' }}
           value={priceCo2}
           helperText={''}
           onChange={({target: { value }}) => setPriceCo2(value)}
           type={'number'}
           leftLabel='EUR/t'
         />
         <CommonInput
           label=""
           id="precioEnergía"
           sx={{ m: 1, width: '25ch' }}
           value={ (10.52 * 1.97 *  gnVolume *priceCo2 /1000 ).toFixed(2) || null}
           helperText={''}
           disabled={true}
           variant={'filled'}
           leftLabel='EUR'
         />
       </Box>
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <Box sx={{
         display: 'flex',
         flexDirection: 'row',
       }}>
        <CommonInput
         label=""
         id="precioEnergía"
         sx={{ m: 1, width: '25ch' }}
         value={(10.53*1.97*mixVolume*mixGnper/100).toFixed(2)}
         disabled={true}
         variant={'filled'}
         leftLabel='kg CO2'
        />
        <CommonInput
           label=""
           id="precioEnergía"
           sx={{ m: 1, width: '25ch' }}
           value={priceCo2}
           helperText={''}
           onChange={({target: { value }}) => setPriceCo2(value)}
           type={'number'}
           leftLabel='EUR/t'
         />
         <CommonInput
           label=""
           id="precioEnergía"
           sx={{ m: 1, width: '25ch' }}
           value={ (priceCo2 * 10.53*1.97*mixVolume*mixGnper/(100*1000)).toFixed(2) || null}
           helperText={''}
           disabled={true}
           variant={'filled'}
           leftLabel='EUR'
         />
       </Box>
     </Box>
   </Box>
 </Box >

  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper title={"Generación Co2"} sx={{ ml: 10 }}>
          {EmisionEstimation()}
        </CommonPaper>
      </Grid>
    </Box>
  );
}