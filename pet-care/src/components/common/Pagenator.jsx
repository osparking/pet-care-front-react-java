import React from "react";
import { Pagination } from "react-bootstrap";

const Pagenator = ({ pageSize, totalItems, currPage, paginate }) => {
  let active = currPage;
  let items = [];
  for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
    active = i;
  }
  return <div>Pagenator</div>;
};

export default Pagenator;
