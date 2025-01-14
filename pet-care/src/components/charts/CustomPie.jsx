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
          <Legend verticalAlign="bottom" className="m-5"/>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomPie;
