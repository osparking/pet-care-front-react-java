import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useColorMapping from "../hooks/ColorMapping";

const CustomPie = ({
  data,
  dataKey = "value",
  nameKey = "name",
  width = "80%",
  height = 400,
}) => {
  const colors = useColorMapping();
  {console.log("user data: ", data)}
  return (
    <section>
      <h4 className="text-center mt-2">예약 통계/차트</h4>
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            dataKey={dataKey}
            data={data}
            label={({ [nameKey]: name }) => name}
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
              ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomPie;
