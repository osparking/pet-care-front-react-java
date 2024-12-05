import React from "react";

export default function AlertMessage({ type, message }) {
  if (!message) return null;
  return (
    <Alert varient={type} dismissible>
      {message}
    </Alert>
  );
}
