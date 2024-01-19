export default function Resultados(props) {
  return (
    <div>
        <ul id="resultados">
        <p><b>Timezone: {props.items.timezone}</b></p>
        <p><b>El tiempo en los próximos días será:</b></p>
        <ul id="card">
          {props.items.daily.slice(0, props.numitems).map((item, i) => (
            <li key={i}>
              <p><b>{new Date(item.dt * 1000).toLocaleDateString()}</b></p>
              <img className="tiempoimg" src={process.env.PUBLIC_URL +item.weather[0].icon
                + "@2x.png"} alt="Imagen del clima" />
              <p>Temp: {(item.temp.day - 273).toFixed(2)}ºC</p>
              <p>Humedad: {item.humidity}%</p>
              <p>Viento: {item.wind_speed}m/s</p>
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
