import React from "react";

const EventTable = ({ events }) => {
  if (!events.length)
    return <div className="text-red-500">No events data available</div>;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Key Events</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Event Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Source</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.Date}>
              <td className="border p-2">{e.Date}</td>
              <td className="border p-2">{e["Event Description"]}</td>
              <td className="border p-2">{e.Category}</td>
              <td className="border p-2">
                <a href={e.Source} target="_blank" className="text-blue-500">
                  {e.Source}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
