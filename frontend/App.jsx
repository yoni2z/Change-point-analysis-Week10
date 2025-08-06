import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PriceChart from "./PriceChart.jsx";
import ChangePointTable from "./ChangePointTable.jsx";
import EventTable from "./EventTable.jsx";
import EnergyChart from "./EnergyChart.jsx";
import TradeChart from "./TradeChart.jsx";

const App = () => {
  const [prices, setPrices] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [events, setEvents] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [trade, setTrade] = useState([]);
  const [dateRange, setDateRange] = useState([
    moment("1987-05-20").format("YYYY-MM-DD"),
    moment("2022-09-30").format("YYYY-MM-DD"),
  ]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/prices")
      .then((res) => setPrices(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/api/change_points")
      .then((res) => setChangePoints(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/api/events")
      .then((res) => {
        setEvents(res.data);
        const cats = [...new Set(res.data.map((e) => e.Category))];
        setCategories(cats);
        setSelectedCategories(cats);
      })
      .catch((err) => console.error(err));
    axios
      .get("/api/energy")
      .then((res) => setEnergy(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/api/trade")
      .then((res) => setTrade(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      selectedCategories.includes(event.Category) &&
      moment(event.Date).isBetween(dateRange[0], dateRange[1], undefined, "[]")
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Brent Oil Price Dashboard (1987-2022)
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Date Range</label>
          <input
            type="date"
            value={dateRange[0]}
            onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={dateRange[1]}
            onChange={(e) => setDateRange([dateRange[0], e.target.value])}
            className="border p-2 rounded w-full mt-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Event Categories</label>
          <select
            multiple
            value={selectedCategories}
            onChange={(e) =>
              setSelectedCategories(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="border p-2 rounded w-full h-24"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <PriceChart
        prices={prices}
        changePoints={changePoints}
        events={filteredEvents}
      />
      <ChangePointTable changePoints={changePoints} />
      <EventTable events={filteredEvents} />
      <EnergyChart energy={energy} />
      <TradeChart trade={trade} />
    </div>
  );
};

export default App;
