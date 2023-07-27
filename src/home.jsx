import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StopsContext } from "./context/stops.context";

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

  return (
    <>
      <h1>My Connections</h1>
      {connections && connections.length > 0 ? (
        connections.map((connection) => {
          return (
            <p
              key={connection.name}
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
        <button disabled>New</button>
      ) : (
        <button onClick={newConnection}>New</button>
      )}
    </>
  );
};

export default Home;
