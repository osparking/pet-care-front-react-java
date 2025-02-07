import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NoDataAvailable from "../common/NoDataAvailable";
import { getSpecializations } from "../user/UserService";

const VetSpecChart = () => {
  const [vetSpecials, setVetSpecials] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const readSpecials = async () => {
      try {
        // 수의사 전문분야 통계 읽기 - 서비스 함수 사용
        const response = await getSpecializations();
        const rawSpecials = response.data;
        console.log("전문분야: ", response.data);
        const specialsWithColor = rawSpecials.map((special) => ({
          ...special,
          color: `hsl(${special.color}, 70%, 50%)`,
        }));
        setVetSpecials(specialsWithColor);
      } catch (error) {
        console.error("전문분야 채취 오류:", error.message);
        setErrorMessage("전문분야 채취 오류:" + error.message);
      }
    };
    readSpecials();
  }, []);

  return (
    <section>
      {vetSpecials && vetSpecials.length > 0 ? (
        <React.Fragment>
          <ResponsiveContainer width={"50%"} height={400}>
            <h5 className="mt-4 mb-4 chart-title">수의사 분야 통계</h5>
            <BarChart data={vetSpecials}>
              <XAxis
                dataKey="specialty"
                angle={-30}
                textAnchor="end"
                height={70}
              />
              <YAxis domain={[0, 5]} tickCount={6} tick={[0, 1, 2, 3, 4, 5]} />
              <Tooltip
                content={(props) => {
                  const { payload } = props;
                  console.log("payload: ", props);
                  if (payload && payload.length) {
                    return (
                      <div
                        style={{ backgroundColor: "#aab5b0" }}
                        className="p-4"
                      >
                        <p className="text-primary">
                          {payload[0].payload.specialty}:{" "}
                          {payload[0].payload.count}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="#8884d8">
                {vetSpecials.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      ) : (
        <NoDataAvailable
          dataType={" 수의사 전문분야 자료 "}
          errorMessage={errorMessage}
        />
      )}
    </section>
  );
};

export default VetSpecChart;
