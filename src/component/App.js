import Nav from "./Nav";
import Info from "./Info";
import DailyWeather from "./DailyWeather";
import Cloud from "./Cloud";
import { useContext, useEffect } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { WeatherContext } from "../context/WeatherContext";

function App() {
  const { state, dispatch, iconRef } = useContext(WeatherContext);
  const { error, isLoading, theme, location } = state;
  useEffect(() => {
    document.body.className = theme;
    const iconEl = iconRef.current;
    iconEl?.classList.add("rotate");
    const timer = setTimeout(function () {
      iconEl.classList.remove("rotate");
    }, 400);
    return () => clearTimeout(timer);
  }, [theme, iconRef]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchWeather() {
      if (location.length < 2)
        return dispatch({ type: "SET_WEATHER", payload: {} });
      try {
        dispatch({ type: "loading", payload: true });
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
          { signal: controller.signal },
        );
        const geoData = await geoRes.json();

        if (!geoData.length) {
          throw new Error("Location not found");
        }

        const { lat, lon, name } = geoData[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);
        dispatch({ type: "SET_DISPLAY_LOCATION", payload: name });
        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=weathercode,temperature_2m_max,temperature_2m_min`,
        );
        const weatherData = await weatherRes.json();
        dispatch({ type: "SET_WEATHER", payload: weatherData.daily });
        dispatch({ type: "loading", payload: false });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "Rejected", payload: err.message });
          dispatch({ type: "loading", payload: false });
        }
      }
    }
    fetchWeather().then();
    return () => {
      controller.abort();
    };
  }, [location]);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        if (!navigator.geolocation) {
          throw new Error("Your browser does not support geolocation");
        }
        dispatch({ type: "loading", payload: true });
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=fr`,
            );

            const geoData = await geoRes.json();
            const cityName = geoData?.city || "Unknown location";
            dispatch({ type: "SET_DISPLAY_LOCATION", payload: cityName });

            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&daily=weathercode,temperature_2m_max,temperature_2m_min`,
            );
            const weatherData = await weatherRes.json();
            dispatch({ type: "SET_WEATHER", payload: weatherData.daily });
            dispatch({ type: "loading", payload: false });
          },
          (err) => {
            dispatch({ type: "Rejected", payload: err.message });
            dispatch({ type: "loading", payload: false });
          },
        );
      } catch (err) {
        dispatch({ type: "Rejected", payload: err.message });
        dispatch({ type: "loading", payload: false });
      }
    }
    if (location === "" || location.length < 2) fetchInitialData().then();
  }, [location]);
  return (
    <>
      <Nav />
      {error !== null ? (
        <Message error={error} />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <Info />
          <DailyWeather />
          {Array.from({ length: 4 }).map((_, i) => {
            const isEven = (i + 1) % 2 === 0;
            const type = isEven ? "cloud" : "clouds";
            return <Cloud key={i} clouds={type} index={i + 1} />;
          })}
        </>
      )}
    </>
  );
}

export default App;
