const fetchSolarData = async (props) => {
  console.log(`props.pvprice: ${props.pvprice}`)

  const res = await fetch(`/api/v5_2/PVcalc?outputformat=json&lat=${props.latitud}&lon=${props.longitud}&raddatabase=PVGIS-SARAH2&browser=0&peakpower=${props.peakPower}&loss=${props.loss}&mountingplace=${props.fixType === 'Anclaje libre' ? 'free' : 'building'}&pvtechchoice=crystSi&${props.optSlopeAndAzimut ? 'optimalangles=1' : props.optSlope ? `optimalinclination=1&aspect=${props.azimut}` : `angle=${props.slope}&aspect=${props.azimut}`}&usehorizon=1&userhorizon=&js=1${props.optPVPrice ? `&pvprice=1&systemcost=${props.pvSystemPrice}&interest=${props.interest}&lifetime=${props.lifeTime}` : ''}`, {
    method: "GET"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return { error: "No se puede obtener la informacion por razones de seguridad" }
    })
    .catch((error) => {
      return { error: error.message }
    })
  return res;
}

const fetchREEPrices = async (date, timeF, timeL) => {
  const res = await fetch(`https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${date}T${timeF}:00&end_date=${date}T${timeL}:59&time_trunc=hour`, {
    method: "GET"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return { error: "No se puede obtener la informacion. Asegurese de que la fecha es igual o anterior a hoy y que 'Hasta Hora' es posterior a 'Desde Hora'" }
    })
    .catch((error) => {
      return { error: error.message }
    })
  return res;
}

export { fetchSolarData, fetchREEPrices };