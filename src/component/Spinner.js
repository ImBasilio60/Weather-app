function Spinner() {
  return (
    <div
      className={
        "container-fluid d-flex align-items-center justify-content-center "
      }
      style={{ height: "50vh" }}
    >
      <div
        className="spinner-border"
        style={{
          width: "3rem",
          height: "3rem",
        }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Spinner;
