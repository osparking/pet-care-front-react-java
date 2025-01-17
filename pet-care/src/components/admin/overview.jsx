import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { getAppoCount } from "../appointment/ServiceAppointment";
import CardCompo from "../cards/CardCompo";
import AccountActive from "../charts/AccountActive";
import AppointChart from "../charts/AppointChart";
import UserRegister from "../charts/UserRegister";
import {
  getPatientCount,
  getUserCount,
  getVetCount,
} from "../user/UserService";
import VetSpecChart from "../charts/VetSpecChart";

const Overview = () => {
  const [userCount, setUserCount] = useState(0);
  const [vetCount, setVetCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appoCount, setAppoCount] = useState(0);

  useEffect(() => {
    const readCounts = async () => {
      try {
        // Fetch user count
        const userCount = await getUserCount();
        const vetCount = await getVetCount();
        const patientCount = await getPatientCount();
        const appoCount = await getAppoCount();
        setUserCount(userCount);
        setVetCount(vetCount);
        setPatientCount(patientCount);
        setAppoCount(appoCount);
      } catch (e) {
        console.error("유저 건수 읽는 오류: ", e);
      }
    };
    readCounts();
  }, []); // useEffect body executes only once when this page is loaded

  return (
    <main>
      <h5 className="chart-title">실적 통계</h5>
      <div className="main-cards">
        <CardCompo label={"유저"} count={userCount} IconCompo={BsPeopleFill} />
        <CardCompo label={"예약"} count={appoCount} IconCompo={BsPeopleFill} />
        <CardCompo label={"수의사"} count={vetCount} IconCompo={BsPeopleFill} />
        <CardCompo
          label={"팻주인"}
          count={patientCount}
          IconCompo={BsPeopleFill}
        />
      </div>
      <div className="charts">
        <div className="chart-container">
          <UserRegister />
        </div>
        <div className="chart-container">
          <AppointChart />
        </div>
        <div className="chart-container">
          <AccountActive />
        </div>
        <div className="chart-container">
          <VetSpecChart />
        </div>
      </div>
    </main>
  );
};

export default Overview;
