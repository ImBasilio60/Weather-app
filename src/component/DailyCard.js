function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function DailyCard({ date, max, min, code, isToday, getWeatherIcon }) {
  let day = new Date(date);

  return (
    <div className="col-4 col-lg mb-3">
      <div className="card text-center">
        <div className="card-body">
          <p>
            {isToday ? (
              "Today"
            ) : (
              <>
                {formatDay(date)} &nbsp;
                <span>{day.getDate().toString().padStart(2, "0")}</span>
              </>
            )}
          </p>

          <img
            src={`/img/${getWeatherIcon(code)}`}
            className="mb-3"
            alt={code}
          />
          <p className="text-body-secondary">
            <strong>{Math.floor(min)}&deg;</strong>c &nbsp; -&nbsp;
            <strong>{Math.floor(max)}&deg;</strong>c
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyCard;
