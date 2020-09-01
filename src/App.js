import React, { useState, useEffect } from "react";
import From from "./ components/ Form";
import "./ styles.css";
import Error from "./ components/Error";
import Cities from "./ components/Cities";

function App() {
  const [consultCity, setConsultCity] = useState("");

  const [cities, setCities] = useState();
  const [clase, setClase] = useState("");

  const [errorApi, setErrorApi] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const [spinners, setSpinners] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setSpinners(true);

      const coordenadas = async () => {
        try {
          const url = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
          );

          const data = await url.json();

          if (data.cod == 404) {
            setSearchError(true);
            setSpinners(false);
            setCities();
            return;
          }

          setTimeout(() => {
            setCities(data);

            setSpinners(false);
          }, 2000);
        } catch (error) {
          setErrorApi(true);
        }
      };

      coordenadas();
    });
  }, []);

  useEffect(() => {
    const consultApi = async () => {
      if (consultCity === "") {
        return;
      }

      setSpinners(true);
      try {
        const url = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${consultCity}&appid=${process.env.REACT_APP_API_KEY}`
        );

        const data = await url.json();

        setSearchError(false);

        if (data.cod == 404) {
          setSearchError(true);
          setSpinners(false);
          setCities();
          return;
        }

        setTimeout(() => {
          setCities(data);

          setSpinners(false);
        }, 2000);
      } catch (error) {
        setErrorApi(true);
      }
    };

    consultApi();
  }, [consultCity]);

  useEffect(() => {
    if (cities) {
      if (cities.weather[0].main === "Clouds") {
        setClase("fondo-clouds");
        return;
      }

      if (cities.weather[0].main === "Rain") {
        setClase("fondo-rain");
        return;
      } else {
        setClase("fondo");
      }
    }
  }, [cities]);

  return (
    <div className={`fondo ${clase}`}>
      <div className="title">
        <h1>PRONOSTICO DEL TIEMPO</h1>
      </div>
      {spinners ? (
        <div
          id="spinner"
          className=" spinner-border text-info"
          role="status"
        ></div>
      ) : null}
      <div className="cities">
        {searchError ? <Error message="No se encontraron resultado" /> : null}

        {cities === undefined ? null : <Cities cities={cities} />}
      </div>

      {errorApi ? (
        <Error messageError="Algo fallo, realice una nueva busqueda" />
      ) : null}
      <div className="from-container">
        <From setSearchError={setSearchError} setConsultCity={setConsultCity} />
      </div>
    </div>
  );
}

export default App;
