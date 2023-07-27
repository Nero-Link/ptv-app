import { useNavigate, useSearchParams } from "react-router-dom";
import DataSet from "./utils/example-data";

import train from "./images/train.svg";
import tram from "./images/tram.svg";
import bus from "./images/bus.svg";
import Connection from "./components/connection-component";

import "./App.scss";

const Connections = () => {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const connections = JSON.parse(localStorage.getItem("connections"));

  const home = () => {
    navigate("/");
  };

  const connect = queryParameters.get("id");

  return (
    <div className="container">
      <h1>{connect}</h1>
      <div>
        {connections.map((connection) => {
          if (connect === connection.name)
            return connection.stops.map((stop) => {
              return DataSet.stops.map((stopName) => {
                if (stopName.id === stop)
                  return (
                    <div className="connection-container">
                      <div className="connection-header">
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
                        <h4 key={stop}>{stopName.title}</h4>
                      </div>
                      <Connection data={{ stop, stopName }} />
                    </div>
                  );
              });
            });
        })}
      </div>
      <br />
      <button onClick={home}>Home</button>
    </div>
  );
};

export default Connections;
