import './App.css';
import Header from './Header';
import CONFIG from './config/config';
import Resultados from './Resultados';
import { mock1 } from './constants/mock.js';
import { useState } from "react";
const USE_SERVER = CONFIG.use_server;
function App() {
  const [queryLatitud, setQueryLatitud] = useState(CONFIG.default_lat); //Los valores por defecto que tienen contener los inputs
  const [queryLongitud, setQueryLongitud] = useState(CONFIG.default_lon);
  const [resultado, setResultado] = useState("");
  const [error,setError]=useState("");
  const callServer = async () => {
      try {
        if (USE_SERVER) {
        let queryparams = "?lat="+queryLatitud+"&lon=" +queryLongitud + "&appid="+ CONFIG.api_key;
        const response = await fetch(`${CONFIG.server_url}${queryparams}`);
        const data = await response.json();
        if(response.status===200){
          setResultado(data);
          setError(null);
        }else {
          setError(data);
        }
        }else {
        setResultado(mock1);
        }
      } catch(e) {
        setError(e.message);
      }
    }
  return (
    <div id="main">
      <Header/>
      <h2 id="titulo">El tiempo</h2>
      <div>
        <label htmlFor="latitud">Latitud:</label>
        <input type="number" id="latitud" value={queryLatitud} placeholder="Latitud" onChange={e => setQueryLatitud(e.target.value)}></input>
      </div>
      <div>
        <label htmlFor="longitud">Longitud:</label>
        <input type="number" id="longitud" placeholder="Longitud" value={queryLongitud} onChange={e => setQueryLongitud(e.target.value)}></input>
      </div>
      <button id="buscar" type="submit" className="new" onClick={()=>callServer()}>Buscar</button>
      {resultado &&!error&& <Resultados numitems={CONFIG.num_items} items={resultado} />}
      {error && <><br></br><div id ="error"><b>Error</b></div><p id="error"><b>Se ha producido un error</b></p>
      <p>Descripción:Obtenido error al llamar al API.Código 400</p><p>Mensaje del servidor:{error.message}</p></>}
    </div>
  );
}
export default App;
