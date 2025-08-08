import Nav from "./Nav";
import Info from "./Info";
import DailyWeather from "./DailyWeather";
import Cloud from "./Cloud";
import { useEffect, useRef, useState } from "react";
function getWeatherIcon(wmoCode) {
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
function App() {
  const [theme, setTheme] = useState("light");
  const [location, setLocation] = useState("Antsirabe");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  const iconRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
    iconRef.current.classList.add("rotate");
    setTimeout(function () {
      iconRef.current.classList.remove("rotate");
    }, 400);
  }, [theme, iconRef]);
  useEffect(() => {
    async function fetchWeather() {
      if (location.length < 2) return setWeather({});

      try {
        setIsLoading(true);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
        );
        const geoData = await geoRes.json();
        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name } = geoData.results.at(0);

        setDisplayLocation(name);

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
        );
        const weatherData = await weatherRes.json();
        console.log(weatherData);
        setWeather(weatherData.daily);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [location]);

  function handleChangeTheme(e) {
    e.preventDefault();
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  }
  return (
    <>
      <Nav
        onChangeTheme={handleChangeTheme}
        theme={theme}
        iconRef={iconRef}
        setLocation={setLocation}
        location={location}
      />
      <Info
        location={displayLocation}
        weather={weather}
        getWeatherIcon={getWeatherIcon}
      />
      <DailyWeather weather={weather} getWeatherIcon={getWeatherIcon} />
      {Array.from({ length: 4 }).map((_, i) => {
        const isEven = (i + 1) % 2 === 0;
        const type = isEven ? "cloud" : "clouds";
        return <Cloud key={i} clouds={type} index={i + 1} />;
      })}
    </>
  );
}

export default App;
