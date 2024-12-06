import React from "react";
import { Alert } from "react-bootstrap";

export default function AlertMessage({ type, message }) {
  if (!message) return null;
  return (
    <Alert varient={type} dismissible>
      {message}
    </Alert>
  );
}
