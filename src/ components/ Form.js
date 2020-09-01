import React, { useState } from "react";
import Error from "./Error";

const Form = ({ setConsultCity, setSearchError }) => {
  const [input, setInput] = useState("");

  const [error, setError] = useState(false);

  const inputValue = (e) => {
    setInput(e.target.value);
  };

  const ValidateForm = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError(true);
      setSearchError(false);
    } else {
      setError(false);
    }

    setConsultCity(input);
  };

  return (
    <div>
      <div className="form-group">
        <input id="input" type="text" onChange={inputValue} />
        {error ? (
          <Error mensajeError="Ingrese el nombre de una Ciudad   " />
        ) : null}
      </div>
      <div>
        <button onClick={ValidateForm} className="btn btn-danger">
          enviar
        </button>
      </div>
    </div>
  );
};

export default Form;
