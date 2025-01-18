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
    <section className="pb-5">
      <ResponsiveContainer width={width} height={height}>
        <PieChart margin={{ left: 100 }}>
          <Pie
            dataKey={dataKey}
            data={data}
            cx="50%"
            cy="50%"
            label={({ [nameKey]: name }) => name}
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name]} />
              ))}
          </Pie>
          <Tooltip />
          <Legend align="right" layout="vertical"/>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomPie;
