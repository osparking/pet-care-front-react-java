import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUserByMonthType } from "../user/UserService";

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
          ([month, userCountByTypeObject]) => {
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
      <BarChart data={userStat}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-50} textAnchor="end" height={70} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"수의사"} fill="#8884d8" />
        <Bar dataKey={"팻주인"} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserRegister;
