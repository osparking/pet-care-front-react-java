import React from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ pageSize, totalItems, currPage, setCurrPage }) => {
  let items = [];
  for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i == currPage}
        onClick={() => setCurrPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex justify-content-end">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default Paginator;
