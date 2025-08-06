import DailyCard from "./DailyCard";

function DailyWeather() {
  return (
    <div className="container mt-5 px-5">
      <div className="row">
        <div className="col-12 mb-3">
          <h4>Daily</h4>
        </div>
      </div>
      <div className="row">
        {Array.from({ length: 7 }).map((_, i) => {
          return (
            <>
              <DailyCard key={i + 10} />
              {i === 0 && <div className="col-12 d-lg-none"></div>}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default DailyWeather;
