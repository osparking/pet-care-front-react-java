import React from "react";
import { Button } from "react-bootstrap";
import ProcessSpinner from "../common/ProcessSpinner";

const ActButton = ({
  title,
  action,
  variant,
  onClick,
  disabled,
  isProcessing,
  className = "",
}) => {
  return (
    <div className="d-flex justify-content-end gap-2 mt-2 mb-2">
      <Button
        variant={variant}
        size="sm"
        disabled={disabled || isProcessing}
        onClick={onClick}
        className={`me-2 ${className}`}
      >
        {isProcessing ? <ProcessSpinner message={action} /> : title}
      </Button>
    </div>
  );
};

export default ActButton;
