import { createContext, useReducer, useRef } from "react";

export const WeatherContext = createContext();
const initialState = {
  theme: "light",
  location: "",
  isLoading: true,
  displayLocation: "",
  weather: {},
  error: null,
};

export function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "003-sun.png"],
    [[1], "001-cloudy.png"],
    [[2], "001-cloudy.png"],
    [[3], "002-clouds.png"],
    [[45, 48], "002-clouds.png"],
    [[51, 56, 61, 66, 80], "006-weather.png"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "005-cloudy-2.png"],
    [[71, 73, 75, 77, 85, 86], "001-cloud.png"],
    [[95], "008-storm.png"],
    [[96, 99], "008-storm.png"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.payload,
      };
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_DISPLAY_LOCATION":
      return {
        ...state,
        displayLocation: action.payload,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "Rejected":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    default:
      throw new Error("The option doesn't match");
  }
}
export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, location, isLoading, displayLocation, weather, error } = state;
  const iconRef = useRef(null);

  function handleChangeTheme(e) {
    e.preventDefault();
    dispatch({ type: "SET_THEME" });
  }
  return (
    <WeatherContext.Provider
      value={{
        state,
        dispatch,
        iconRef,
        handleChangeTheme,
        getWeatherIcon,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
