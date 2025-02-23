import React from "react";
import { Spinner } from "react-bootstrap";

const ProcessSpinner = ({ size = "sm", animation = "grow", message = "" }) => {
  return (
    <div className="text-center">
      <Spinner
        as="span"
        animation={animation}
        size={size}
        role="status"
        aria-hidden="true"
      />
      {message && <span className="sr-only">{message}&nbsp;중...</span>}
    </div>
  );
};

export default ProcessSpinner;
