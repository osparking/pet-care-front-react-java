import React from "react";

const UserInfo = ({ userType, apmt }) => {
  return (
    <div className="mt-2 mb-2" style={{ backgroundColor: "whitesmoke" }}>
      <h5>{userType === "VET" ? "팻 주인" : "수의사"} 인적 사항</h5>
      {userType === "VET" ? (
        <React.Fragment>
          <p>예약 번호: {apmt.appointmentNo}</p>
          <p>
            이름: `${apmt.patient.lastName} ${apmt.patient.firstName}`
          </p>
          <p>메일: {apmt.patient.email}</p>
          <p>전화: {apmt.patient.mobile}</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-primary">예약 번호: {apmt.appointmentNo}</p>
          <p>
            수의사: {apmt.veterinarian.lastName} {apmt.veterinarian.firstName}
          </p>
          <p className="text-info">
            전문분야: {apmt.veterinarian.specialization}
          </p>
          <p>메일: {apmt.veterinarian.email}</p>
          <p>전화: {apmt.veterinarian.mobile}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
