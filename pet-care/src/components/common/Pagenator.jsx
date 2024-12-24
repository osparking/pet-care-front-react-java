import React from "react";

const Pagenator = ({ pageSize, totalItems, currPage, pagenate }) => {
  let active = currPage;
  let items = [];
  for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {}
  return <div>Pagenator</div>;
};

export default Pagenator;
