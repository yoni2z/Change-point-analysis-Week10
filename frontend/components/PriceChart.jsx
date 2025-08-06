import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const PriceChart = ({ prices, changePoints, events }) => {
  if (!prices.length || !changePoints.length)
    return (
      <div className="text-red-500">Price or change point data unavailable</div>
    );

  const data = prices.map((p) => ({
    Date: p.Date,
    Price: p.Price,
    Volatility: p.Volatility,
  }));

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        Brent Oil Prices with Change Points and Events
      </h2>
      <LineChart width={800} height={400} data={data} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Price"
          stroke="#8884d8"
          name="Price (USD)"
        />
        <Line
          type="monotone"
          dataKey="Volatility"
          stroke="#82ca9d"
          name="Volatility (Annualized)"
          yAxisId="right"
        />
        {changePoints.map((cp) => (
          <ReferenceLine
            key={cp.Date}
            x={cp.Date}
            stroke="blue"
            label={`Change: ${cp.Date}`}
          />
        ))}
        {events.map((e) => (
          <ReferenceLine
            key={e.Date}
            x={e.Date}
            stroke="red"
            strokeDasharray="3 3"
            label={`Event: ${e["Event Description"]}`}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default PriceChart;
