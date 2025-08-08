import { useEffect, useRef } from "react";

function Nav({ onChangeTheme, theme, iconRef, location, setLocation }) {
  const icon = theme === "dark" ? "fa-sun" : "fa-moon";

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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="btn" onClick={onChangeTheme}>
              <i ref={iconRef} className={`fa ${icon} theme-icon rotate`}></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
