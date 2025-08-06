import React from "react";

const ChangePointTable = ({ changePoints }) => {
  if (!changePoints.length)
    return <div className="text-red-500">No change points data available</div>;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Detected Change Points</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Mean Before ($)</th>
            <th className="border p-2">Mean After ($)</th>
            <th className="border p-2">Price Change (%)</th>
            <th className="border p-2">Event</th>
            <th className="border p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {changePoints.map((cp) => (
            <tr key={cp.Date}>
              <td className="border p-2">{cp.Date}</td>
              <td className="border p-2">{cp.mu_1.toFixed(2)}</td>
              <td className="border p-2">{cp.mu_2.toFixed(2)}</td>
              <td className="border p-2">{cp.price_change_pct.toFixed(2)}</td>
              <td className="border p-2">{cp.event}</td>
              <td className="border p-2">{cp.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChangePointTable;
