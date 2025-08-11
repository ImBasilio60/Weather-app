import DailyCard from "./DailyCard";
import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
function DailyWeather() {
  const { state } = useContext(WeatherContext);
  const { weather } = state;
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div className="container mt-5 px-5">
      <div className="row">
        <div className="col-12 mb-3">
          <h4>Daily</h4>
        </div>
      </div>
      <div className="row">
        {dates?.map((date, i) => {
          return (
            <React.Fragment key={date}>
              <DailyCard
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                isToday={i === 0}
              />
              {i === 0 && <div className="col-12 d-lg-none"></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default DailyWeather;
