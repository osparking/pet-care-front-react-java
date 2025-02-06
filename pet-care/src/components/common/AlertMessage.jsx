import React from "react";
import { Alert } from "react-bootstrap";

export default function AlertMessage({ type, message }) {
  if (!message) return null;
  console.log("type: " + type + ", message: " + message);
  return (
    <Alert variant={type} dismissible>
      {message}
    </Alert>
  );
}
