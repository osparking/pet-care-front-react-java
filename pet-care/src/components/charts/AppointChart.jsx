import React, { useEffect, useState } from "react";
import { getAppointData } from "../appointment/ServiceAppointment";
import NoDataAvailable from "../common/NoDataAvailable";
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
      {appointData && appointData.length > 0 ? (
        <React.Fragment>
          <h5 className="mb-4 chart-title">예약 상태 통계</h5>
          <CustomPie data={appointData} />
        </React.Fragment>
      ) : (
        <NoDataAvailable
          dataType={" (진료) 예약 자료 "}
          errorMessage={errorMessage}
        />
      )}
    </section>
  );
};

export default AppointChart;
