import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="header__wrapper">
          <img
            src="/assets/logo.png"
            alt="logo HRnet"
            className="header__logo"
          />
          <h1 className="header__title">HRnet</h1>
        </div>
      </Link>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__list__item">
            <NavLink to="/employee-list">View Employees</NavLink>
          </li>
          <li className="nav__list__item">
            <NavLink to="/create-employee">Create Employee</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
