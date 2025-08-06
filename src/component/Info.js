function Info() {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center gap-3 mb-4">
          <img src="/img/003-sun.png" alt="" />
          <div>
            <h1 className="fw-bold align-self-end">
              29°<span className="fs-6 fw-light">C</span>
            </h1>
            <time>10 : 00</time>
          </div>
        </div>

        <div className="col-12">
          <h3>Antananarivo</h3>
        </div>
        <div className="col-12">
          <p>Ensoleillé avec quelques nuages</p>
        </div>
      </div>
    </div>
  );
}

export default Info;
