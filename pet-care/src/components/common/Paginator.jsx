import React from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ pageSize, totalItems, currPage, paginate }) => {
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
  return (
    <div className="d-flex justify-content-center">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Paginator;
