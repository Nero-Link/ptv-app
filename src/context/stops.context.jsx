import React from "react";
import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer.utils";

export const StopsContext = createContext([
  {
    name: "",
    stops: [],
    setName: (name) => {},
    setStops: (stops) => {},
  },
]);

const array = [];

if (localStorage.getItem("connections") === null) {
  localStorage.setItem("connections", [JSON.stringify(array)]);
}

const currValue = JSON.parse(localStorage.getItem("connections"));

const ACTIONS_TYPES = {
  SET_NAME: "SET_NAME",
  SET_STOPS: "SET_STOPS",
};

const INITIAL_STATE = {
  currValue,
};

const stopsReducer = (state = INITIAL_STATE.currValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS_TYPES.SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case ACTIONS_TYPES.SET_STOPS:
      return {
        ...state,
        stops: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in Reducer`);
  }
};

export const StopsProvider = ({ children }) => {
  const [{ name, stops }, dispatch] = useReducer(stopsReducer, INITIAL_STATE);

  const setName = (name) => {
    dispatch(createAction(ACTIONS_TYPES.SET_NAME, name));
  };

  const setStops = (stops) => {
    dispatch(createAction(ACTIONS_TYPES.SET_STOPS, stops));
  };

  const value = {
    name,
    stops,
    setName,
    setStops,
  };

  const connection = [];
  JSON.parse(localStorage.getItem("connections")).forEach((value) =>
    connection.push(value)
  );
  connection.push({ name, stops });
  if (connection.length > 1) {
    if (
      connection[connection.length - 1].name ===
      connection[connection.length - 2].name
    )
      connection.pop();
  }
  value.stops &&
    localStorage.setItem("connections", [JSON.stringify(connection)]);

  return (
    <StopsContext.Provider value={value}>{children}</StopsContext.Provider>
  );
};
