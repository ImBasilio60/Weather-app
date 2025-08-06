function Nav() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid">
          <h1>Météo</h1>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
            />
            <button className="btn">
              <i className="fa fa-moon theme-icon"></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
