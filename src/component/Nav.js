import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function Nav() {
  const { state, dispatch, handleChangeTheme, iconRef } =
    useContext(WeatherContext);
  const { location, theme } = state;
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
              onChange={(e) =>
                dispatch({ type: "SET_LOCATION", payload: e.target.value })
              }
            />
            <button className="btn" onClick={handleChangeTheme}>
              <i ref={iconRef} className={`fa ${icon} theme-icon rotate`}></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
