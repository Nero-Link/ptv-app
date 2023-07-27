import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StopsContext } from "./context/stops.context";

import "./App.scss";

const Home = () => {
  const navigate = useNavigate();
  const { name, setName, stops, setStops } = useContext(StopsContext);
  const connections = JSON.parse(localStorage.getItem("connections"));

  const newConnection = () => {
    navigate("/new");
  };

  const gotoConnection = (connect) => {
    navigate(`/connection?id=${connect}`);
  };

  const deletion = () => {
    const text = "Are you sure?";
    if (window.confirm(text) === true) {
      localStorage.removeItem("connections");
      window.location.reload(true);
    }
  };

  return (
    <div className="container">
      <h1>My Connections</h1>
      {connections && connections.length > 0 ? (
        connections.map((connection) => {
          return (
            <p
              key={connection.name}
              className="connection"
              onClick={(e) => gotoConnection(connection.name)}
            >
              {connection.name}
            </p>
          );
        })
      ) : (
        <p>No Connections</p>
      )}
      <br />
      {connections.length === 3 ? (
        <button disabled>Add New</button>
      ) : (
        <button onClick={newConnection}>Add New</button>
      )}
      <br />
      <button onClick={deletion}>Delete All</button>
    </div>
  );
};

export default Home;
