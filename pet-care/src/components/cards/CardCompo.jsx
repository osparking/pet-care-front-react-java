import React from "react";

const CardCompo = ({ label, count, IconCompo }) => {
  return (
    <div className="admin-card">
      <div className="card-inner">
        {label}
        <IconCompo className="card-icon" />
      </div>
      <h3>{count}</h3>
    </div>
  );
};

export default CardCompo;
