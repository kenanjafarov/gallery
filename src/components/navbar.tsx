import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "link active"
              : "link"
          }
        >
          მთავარი
        </NavLink>
      </li>
      <li className="navbar-item">
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "link active"
              : "link"
          }
        >
          ისტორია
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
