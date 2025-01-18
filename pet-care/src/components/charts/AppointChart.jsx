import React, { useEffect, useState } from "react";
import CustomPie from "./CustomPie";
import { getAppointData } from "../appointment/ServiceAppointment";

const AppointChart = () => {
  const [appointData, setAppointData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const readAppointmentData = async () => {
      try {
        // Fetch appointments data calling service function
        const response = await getAppointData();
        setAppointData(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    readAppointmentData();
  }, []);

  return (
    <div>
      <h5 className="mb-4 chart-title">진료 예약</h5>
      <CustomPie data={appointData} />
    </div>
  );
};

export default AppointChart;
