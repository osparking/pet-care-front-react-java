import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ userType, apmt }) => {
  return (
    <div className="mt-2 mb-2" style={{ backgroundColor: "whitesmoke" }}>
      <h5>{userType === "VET" ? "팻 주인" : "수의사"} 인적 사항</h5>
      {userType === "VET" ? (
        <React.Fragment>
          <p className="text-info">예약 번호: {apmt.appointmentNo}</p>
          <p>
            이름: {apmt.patient.lastName}
            {apmt.patient.firstName}
          </p>
          <p>메일: {apmt.patient.email}</p>
          <p className="text-primary">전화: {apmt.patient.mobile}</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="text-info">예약 번호: {apmt.appointmentNo}</p>
          <p>
            수의사: {apmt.veterinarian.lastName} {apmt.veterinarian.firstName}
          </p>
          <p className="text-info">
            전문분야: {apmt.veterinarian.specialization}
          </p>
          <p>메일: {apmt.veterinarian.email}</p>
          <p className="text-primary">전화: {apmt.veterinarian.mobile}</p>
          <Link
            className="text-warning"
            to={`/appointments/create/${apmt.veterinarian.id}`}
          >
            예약하기
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
