import React from "react";
import Spinner from "react-bootstrap";

const ProcessSpinner = ({
  size = "sm",
  animation = "border",
  message = "",
}) => {
  return (
    <div>
      <Spinner
        as="span"
        animation={animation}
        size={size}
        role="status"
        area-hidden="true"
      />
    </div>
  );
};

export default ProcessSpinner;
