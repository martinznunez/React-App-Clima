import React from "react";

const Error = ({ mensajeError, messageError, message }) => {
  return (
    <div className="alert alert-warning" role="alert">
      <p>
        {mensajeError} {messageError} {message}
      </p>
    </div>
  );
};

export default Error;
