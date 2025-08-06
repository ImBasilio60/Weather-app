import { useEffect, useState } from "react";

function Info({ location, weather, getWeatherIcon }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setInterval(function () {
      const date = new Date();
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
      setHours(date.getHours());
    });
  }, [setMinutes, setSeconds, setHours]);

  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center gap-3 mb-4">
          <img src={`/img/${getWeatherIcon(codes?.at(0))}`} alt="" />
          <div>
            <h1 className="fw-bold align-self-end">
              {Math.floor((max?.at(0) + min?.at(0)) / 2)}&deg;
              <span className="fs-6 fw-light">C</span>
            </h1>
            <time>{`${hours < 10 ? "0" + hours : hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`}</time>
          </div>
        </div>

        <div className="col-12">
          <h3>{location}</h3>
        </div>
      </div>
    </div>
  );
}

export default Info;
