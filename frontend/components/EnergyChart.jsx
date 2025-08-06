import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const EnergyChart = ({ energy }) => {
  if (!energy.length)
    return (
      <div className="text-yellow-500">Energy consumption data unavailable</div>
    );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        Transportation Energy Consumption
      </h2>
      <LineChart width={800} height={300} data={energy} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Value"
          stroke="#ff7300"
          name="Trillion Btu"
        />
      </LineChart>
    </div>
  );
};

export default EnergyChart;
