import React, { useEffect, useState } from "react";
import { getAppointData } from "../appointment/ServiceAppointment";
import CustomPie from "./CustomPie";

const AppointChart = () => {
  const [appointData, setAppointData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const readAppointmentData = async () => {
      try {
        // Fetch appointments data calling service function
        const response = await getAppointData();
        setAppointData(response.data);
        console.log("예약 차트 자료: ", response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    readAppointmentData();
  }, []);

  return (
    <section>
      <React.Fragment>
        <h5 className="mb-4 chart-title">예약 상태 통계</h5>
        <CustomPie data={appointData} />
      </React.Fragment>
    </section>
  );
};

export default AppointChart;
