import React from "react";

const UserInfo = ({ userType, apmt }) => {
  return (
    <div className="mt-2 mb-2" style={{ backgroundColor: "whitesmoke" }}>
      <h5>{userType === "VET" ? "팻 주인" : "수의사"} 인적 사항</h5>
    </div>
  );
};

export default UserInfo;
