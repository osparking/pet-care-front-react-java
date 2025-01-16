import React, { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import CardCompo from "../cards/CardCompo";
import {
  getPatientCount,
  getUserCount,
  getVetCount,
} from "../user/UserService";

const Overview = () => {
  const [userCount, setUserCount] = useState(0);
  const [vetCount, setVetCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const readCounts = async () => {
      try {
        // Fetch user count
        const userCount = await getUserCount();
        const vetCount = await getVetCount();
        const patientCount = await getPatientCount();
        setUserCount(userCount);
        setVetCount(vetCount);
        setPatientCount(patientCount);
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
        <CardCompo
          label={"예약"}
          // count={appoCount}
          IconCompo={BsPeopleFill}
        />
        <CardCompo label={"수의사"} count={vetCount} IconCompo={BsPeopleFill} />
        <CardCompo
          label={"팻주인"}
          count={patientCount}
          IconCompo={BsPeopleFill}
        />
      </div>
    </main>
  );
};

export default Overview;
