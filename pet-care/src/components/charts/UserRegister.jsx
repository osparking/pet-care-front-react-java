import React, { useState } from "react";
import { getUserByMonthType } from "../user/UserService";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";

const UserRegister = () => {
  const [userStat, setUserStat] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getUserStat = async () => {
      try {
        const response = await getUserByMonthType();
        const userStat = await response.data;
        console.log("user stat:", userStat);
        const chartData = Object.entries(userStat).map(
          (month, userCountByTypeObject) => {
            return {
              name: month,
              수의사: userCountByTypeObject.VET || 0,
              팻주인: userCountByTypeObject.PATIENT || 0,
            };
          }
        );
        console.log("chartData:", chartData);
        setUserStat(chartData);
      } catch (err) {
        setErrorMessage(err.message);
      }
    };
    getUserStat();
  }, []);

  return (
    <ResponsiveContainer width={"60%"} height={400}>
      <h5 className="chart-title mb-5">등록 유저 통계</h5>
      <BarChart data={userStat}></BarChart>
    </ResponsiveContainer>
  );
};

export default UserRegister;
