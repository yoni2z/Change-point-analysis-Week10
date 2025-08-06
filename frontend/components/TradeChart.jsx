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

const TradeChart = ({ trade }) => {
  if (!trade.length)
    return (
      <div className="text-yellow-500">Petroleum trade data unavailable</div>
    );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        Petroleum Imports from Algeria
      </h2>
      <LineChart width={800} height={300} data={trade} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Value"
          stroke="#ff7300"
          name="Thousand Barrels per Day"
        />
      </LineChart>
    </div>
  );
};

export default TradeChart;
