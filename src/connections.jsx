import { useNavigate, useSearchParams } from "react-router-dom";
import DataSet from "./utils/example-data";

import train from "./images/train.svg";
import tram from "./images/tram.svg";
import bus from "./images/bus.svg";
import Connection from "./components/connection-component";

const Connections = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const connections = JSON.parse(localStorage.getItem("connections"));

  const home = () => {
    navigate("/");
  };

  const connect = queryParameters.get("id");

  return (
    <>
      <h1>{connect}</h1>
      {connections.map((connection) => {
        if (connect === connection.name)
          return connection.stops.map((stop) => {
            return DataSet.stops.map((stopName) => {
              if (stopName.id === stop)
                return (
                  <>
                    <img
                      src={
                        stopName.mode === "train"
                          ? train
                          : stopName.mode === "tram"
                          ? tram
                          : stopName.mode === "bus"
                          ? bus
                          : null
                      }
                      alt="PTV"
                      height="50px"
                    />
                    <p key={stop}>{stopName.title}</p>
                    <Connection data={{ stop, stopName }} />
                  </>
                );
            });
          });
      })}
      <br />
      <button onClick={home}>Home</button>
    </>
  );
};

export default Connections;
