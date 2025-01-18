import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getUserActivenessStat } from "../user/UserService";

const AccountActive = () => {
  const [accountData, setAccountData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAcccountTypeActStat = async () => {
      try {
        const result = await getUserActivenessStat();
        const userActivenessStat = result.data;

        // 후단 근본 자료를 차트용 자료로 변형
        const accountData = Object.entries(userActivenessStat).flatMap(
          ([status, counts]) =>
            status === "Enabled"
              ? [
                  {
                    name: "활성인 팻주인",
                    value: status === "Enabled" ? counts.PATIENT : 0,
                    color: "#d26161",
                  },
                  {
                    name: "활성인 수의사",
                    value: status === "Enabled" ? counts.VET : 0,
                    color: "#ffff00 ",
                  },
                ]
              : [
                  {
                    name: "비활성 팻주인",
                    value: status === "Enabled" ? 0 : counts.PATIENT,
                    color: "#926262",
                  },

                  {
                    name: "비활성 수의사",
                    value: status === "Enabled" ? 0 : counts.VET,
                    color: "#557a56",
                  },
                ]
        );
        setAccountData(accountData);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAcccountTypeActStat();
  }, []);

  return (
    <div>
      <h5 className="mt-4 chart-title">계정 활동성 집계</h5>
      <ResponsiveContainer width="80%" height={400}>
        <PieChart>
          <Pie
            data={accountData}
            dataKey="value"
            nameKey="name"
            label
            outerRadius={110}
            fill="#8884d8"
          >
            {accountData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="right" layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountActive;
