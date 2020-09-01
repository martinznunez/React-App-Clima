import React from "react";

const Cities = ({ cities }) => {
  const { main, name, weather } = cities;

  console.log(weather[0].main);

  let temp = main.temp;
  let tempMax = main.temp_max;
  let tempMin = main.temp_min;

  let icon = weather[0].icon;
  const imagenIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  tempMax = (tempMax - 273.15) * 1;
  tempMin = (tempMin - 273.15) * 1;
  temp = (temp - 273.15) * 1;

  return (
    <div className="fondo-total">
      <div className="container-city">
        <img src={imagenIcon} width="150" />
        <h3> Ciudad de {name} </h3>
        <h6> {temp.toFixed(1)} ℃ TEMPERATURA </h6>
        <div className="temp-max-min">
          <p> {tempMax.toFixed(1)} ℃ TEMP MAX </p>
          <p> {tempMin.toFixed(1)} ℃ TEMP MIN </p>
        </div>
      </div>
    </div>
  );
};

export default Cities;
