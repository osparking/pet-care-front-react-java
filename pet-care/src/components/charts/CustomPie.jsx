import React from "react";
import useColorMapping from "../hooks/ColorMapping";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const CustomPie = (
  data,
  dataKey = "value",
  nameKey = "name",
  width = "80%",
  height = 400
) => {
  const colors = useColorMapping();

  return (
    <section>
      <h4 className="text-center">예약 통계/차트</h4>
      <ResponsiveContainer width={width} height={height}>
        <PieChart></PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default CustomPie;
