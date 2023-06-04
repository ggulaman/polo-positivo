//import React, { useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import CommonPaper from "../../components/common/CommonPaper/CommonPaper";
import { Grid } from "@mui/material";
// import CommonSelect from "../../components/common/CommonSelect/CommonSelect";
// import CommonInput from '../../components/common/CommonInput/CommonInput';
import { H2cost } from './H2HydroCost'
// const technologyTypes = ['PEM', 'Alcalina', 'SOEC'];

export const Hydrogen = () => {
  // const [energyPrice,] = useState(null)
  //const [renFactor,] = useState(null)
  //const [gridPrice,] = useState(null)


  // const EmisionEstimation = () =>
  //   <Box sx={{
  //     display: 'flex',
  //     //flexDirection: 'column',
  //   }}>
  //     <Box>
  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Balance Energético`}</Box>

  //       <Box sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //       }}>

  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='kg H2'
  //         />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='Kg Gas'
  //         />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={'[1, ..., 50]'}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='m3 GN'
  //         />
  //       </Box>

  //       <br />

  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Blending [Vol]`}</Box>

  //       <Box sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //       }}>

  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='% H2'
  //         />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='% GN'
  //         />
  //       </Box>

  //     </Box>
  //     <Box sx={{ ml: 8 }}>
  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Energía`}</Box>
  //       <Box sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //       }}>

  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='kWh'
  //         />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='kWh'
  //         />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='kWh'
  //         />
  //       </Box>
  //     </Box>
  //     <Box sx={{ ml: 8 }}>
  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Emisiones`}</Box>
  //       <Box sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //       }}>

  //         <Box sx={{ mt: 3, mb: 3.5, ml: 1, fontWeight: "bold" }}>{`0 kgH2`}</Box>
  //         <Box sx={{
  //           display: 'flex',
  //           flexDirection: 'row',
  //         }}>
  //           <CommonInput
  //             label=""
  //             id="precioEnergía"
  //             sx={{ m: 1, width: '25ch' }}
  //             value={energyPrice}
  //             helperText={''}
  //             // error={isLatitudError}
  //             // onChange={({ target: { value } }) => {
  //             //   setIsLatitudError(!validateDegrees(value))
  //             //   setLatitud(value)
  //             // }}
  //             onChange={() => null}
  //             leftLabel='kg CO2'
  //           />
  //           <CommonInput
  //             label=""
  //             id="precioEnergía"
  //             sx={{ m: 1, width: '25ch' }}
  //             value={energyPrice}
  //             helperText={''}
  //             // error={isLatitudError}
  //             // onChange={({ target: { value } }) => {
  //             //   setIsLatitudError(!validateDegrees(value))
  //             //   setLatitud(value)
  //             // }}
  //             onChange={() => null}
  //             leftLabel='EUR/t'
  //           />
  //           <CommonInput
  //             label=""
  //             id="precioEnergía"
  //             sx={{ m: 1, width: '25ch' }}
  //             value={energyPrice}
  //             helperText={''}
  //             // error={isLatitudError}
  //             // onChange={({ target: { value } }) => {
  //             //   setIsLatitudError(!validateDegrees(value))
  //             //   setLatitud(value)
  //             // }}
  //             onChange={() => null}
  //             leftLabel='EUR'
  //           />
  //         </Box>
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <br />
  //         <CommonInput
  //           label=""
  //           id="precioEnergía"
  //           sx={{ m: 1, width: '25ch' }}
  //           value={energyPrice}
  //           helperText={''}
  //           // error={isLatitudError}
  //           // onChange={({ target: { value } }) => {
  //           //   setIsLatitudError(!validateDegrees(value))
  //           //   setLatitud(value)
  //           // }}
  //           onChange={() => null}
  //           leftLabel='kg CO2'
  //         />
  //       </Box>
  //     </Box>
  //   </Box >

  // const H2Generation = () =>
  //   <Box>
  //     <Box sx={{
  //       display: 'flex',
  //       flexDirection: 'row',
  //     }}>
  //       <CommonInput
  //         label="Energia"
  //         id="precioEnergía"
  //         sx={{ m: 1, width: '25ch' }}
  //         value={energyPrice}
  //         helperText={'[0, ..., 250]'}
  //         // error={isLatitudError}
  //         // onChange={({ target: { value } }) => {
  //         //   setIsLatitudError(!validateDegrees(value))
  //         //   setLatitud(value)
  //         // }}
  //         onChange={() => null}
  //         leftLabel='MWh'
  //       />
  //     </Box>
  //     <br />
  //     <Box sx={{
  //       display: 'flex',
  //       flexDirection: 'row',
  //     }}>
  //       <CommonInput
  //         label="Consumo de agua"
  //         id="precioEnergía"
  //         sx={{ m: 1, width: '25ch' }}
  //         value={energyPrice}
  //         helperText={''}
  //         // error={isLatitudError}
  //         // onChange={({ target: { value } }) => {
  //         //   setIsLatitudError(!validateDegrees(value))
  //         //   setLatitud(value)
  //         // }}
  //         onChange={() => null}
  //         leftLabel='l'
  //       />
  //       <CommonInput
  //         label="Agua de rechazo"
  //         id="precioEnergía"
  //         sx={{ m: 1, width: '25ch' }}
  //         value={energyPrice}
  //         helperText={''}
  //         // error={isLatitudError}
  //         // onChange={({ target: { value } }) => {
  //         //   setIsLatitudError(!validateDegrees(value))
  //         //   setLatitud(value)
  //         // }}
  //         onChange={() => null}
  //         leftLabel='l'
  //       />
  //       <CommonInput
  //         label="Factor de Rechazo"
  //         id="precioEnergía"
  //         sx={{ m: 1, width: '25ch' }}
  //         value={energyPrice}
  //         helperText={'[1, ..., 50]'}
  //         // error={isLatitudError}
  //         // onChange={({ target: { value } }) => {
  //         //   setIsLatitudError(!validateDegrees(value))
  //         //   setLatitud(value)
  //         // }}
  //         onChange={() => null}
  //         leftLabel='l'
  //       />
  //     </Box>
  //     <br />

  //     <Box>
  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Tecnologia`}</Box>
  //       <CommonSelect
  //         sx={{ m: 1, width: '25ch' }}
  //         title='Tecnología'
  //         //value={fixType}
  //         defaultValue={technologyTypes[0]}
  //         //handleChange={event => setFixType(event.target.value)}
  //         handleChange={() => null}
  //         items={technologyTypes}
  //         disabled={false}
  //       />
  //     </Box>
  //     <br />
  //     <Box>
  //       <Box sx={{ color: "#5895d1", fontWeight: "bold" }}>{`Resultado`}</Box>
  //       <CommonInput
  //         label=""
  //         id="precioEnergía"
  //         sx={{ m: 1, width: '25ch' }}
  //         value={energyPrice}
  //         helperText={''}
  //         // error={isLatitudError}
  //         // onChange={({ target: { value } }) => {
  //         //   setIsLatitudError(!validateDegrees(value))
  //         //   setLatitud(value)
  //         // }}
  //         onChange={() => null}
  //         leftLabel='kg H2'
  //       />
  //     </Box>
  //   </Box>;




  return (
    <Box>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>

        <CommonPaper title={"Coste H2"} sx={{ ml: 10 }}>
          <H2cost />
        </CommonPaper>
      </Grid>
      {/* <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>
        <CommonPaper title={"Generación H2"} sx={{ ml: 10 }}>
          {H2Generation()}
        </CommonPaper>
      </Grid>
      <Grid item xs={12} xm={12} sx={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>

        <CommonPaper title={"Calculo de Emisiones"} sx={{ ml: 10 }}>
          {EmisionEstimation()}
        </CommonPaper>
      </Grid> */}

    </Box>
  );
}