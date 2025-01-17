import React, { useEffect, useState } from "react";

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

  return <div>AppointChart</div>;
};

export default AppointChart;
