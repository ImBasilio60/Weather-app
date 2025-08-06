function DailyCard() {
  return (
    <div className="col-4 col-lg mb-3">
      <div className="card text-center">
        <div className="card-body">
          <p>Monday</p>
          <img src="/img/001-cloudy.png" className="mb-3" alt="" />
          <h4 className="fw-bold text-body-secondary">
            29°<span className="fs-6 text-body-secondary">C</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default DailyCard;
