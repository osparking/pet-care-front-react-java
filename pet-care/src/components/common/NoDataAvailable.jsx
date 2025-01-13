import React from "react";

const NoDataAvailable = ({ dataType, errorMessage }) => {
  return (
    <div className="text-center mt-5">
      <h4>현재 {dataType}가/이 존재하지 않습니다.</h4>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default NoDataAvailable;
