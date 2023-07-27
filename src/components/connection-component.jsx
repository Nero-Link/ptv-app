import { useState } from "react";
import DataSet from "../utils/example-data";
import { ptvClient } from "../utils/api.utils";

import "../App.scss";

const Connection = (props) => {
  const stop = props.data.stop;
  const stopName = props.data.stopName;
  const [departureTimes, setDepartureTimes] = useState();

  const departures = (stop, mode) => {
    let routeNo = 0;
    DataSet.routes.map((route) => {
      if (route.mode === mode) {
        routeNo = route.id;
      }
    });
    const type =
      mode === "train" ? 0 : mode === "tram" ? 1 : mode === "bus" ? 2 : 3;
    getDepartures(stop, routeNo, type);
  };

  const getDepartures = async (stop, route, type) => {
    let departures = [];
    await ptvClient
      .then((apis) => {
        return apis.Departures.Departures_GetForStopAndRoute({
          stop_id: stop,
          route_id: route,
          route_type: type,
          max_results: 3,
        });
      })
      .then((res) => {
        res.body.departures.forEach((departure) => {
          let departTime;
          if (departure.estimated_departure_utc != null)
            departTime = departure.estimated_departure_utc;
          else departTime = departure.scheduled_departure_utc;
          if (new Date(departTime).getTime() > new Date().getTime()) {
            departures.push(new Date(departTime).toLocaleString());
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
    !departureTimes && setDepartureTimes(departures);
    return departures;
  };

  return (
    <div className="departures">
      {<p>{departures(stop, stopName.mode)}</p>}
      {departureTimes &&
        departureTimes.length > 0 &&
        departureTimes.slice(0, 3).map((depart) => {
          return <p key={depart}>{depart.split(",")[1].slice(0, -3)}</p>;
        })}
    </div>
  );
};

export default Connection;
