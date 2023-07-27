import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataSet from "./utils/example-data";
import { StopsContext } from "./context/stops.context";

import "./App.scss";

const New = () => {
  const navigate = useNavigate();
  const { name, setName, stops, setStops } = useContext(StopsContext);
  const connections = JSON.parse(localStorage.getItem("connections"));
  const [connectionName, setConnectionName] = useState();
  const stopList = [];

  const addToList = (index, value) => {
    stopList.splice(index, 1, value);
  };

  const home = () => {
    navigate("/");
  };

  const save = () => {
    setName(connectionName);
    setStops(stopList);
    alert("Saved!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>New Connection</h1>
      Name: <input onChange={(e) => setConnectionName(e.target.value)} />
      <br />
      <select
        name="stops"
        id="stops"
        onChange={(e) => addToList(0, e.target.value)}
      >
        <option disabled selected="selected">
          ---Select Stop---
        </option>
        {DataSet.stops.map((stop) => (
          <option value={stop.id}>{stop.title}</option>
        ))}
      </select>
      <br />
      <select
        name="stops"
        id="stops"
        onChange={(e) => addToList(1, e.target.value)}
      >
        <option disabled selected="selected">
          ---Select Stop---
        </option>
        {DataSet.stops.map((stop) => (
          <option value={stop.id}>{stop.title}</option>
        ))}
      </select>
      <br />
      <select
        name="stops"
        id="stops"
        onChange={(e) => addToList(2, e.target.value)}
      >
        <option disabled selected="selected">
          ---Select Stop---
        </option>
        {DataSet.stops.map((stop) => (
          <option value={stop.id}>{stop.title}</option>
        ))}
      </select>
      <br />
      <button type="submit" onClick={save}>
        Save
      </button>
      <button onClick={home}>Cancel</button>
    </div>
  );
};

export default New;
