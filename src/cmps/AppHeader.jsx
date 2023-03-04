import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HamburgerIcon from "../SVGS/HamburgerIcon";
import SideMenu from "./SideMenu";

export function AppHeader() {
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <div className="app-header-container">
      <section className="app-header max-width-container">
        <Link to={"/"} className="logo">
          appSus
        </Link>
        <SideMenu sidebar={sidebar} toggleSidebar={toggleSidebar} />
        <span className="hamburger-menu mobile-only" onClick={toggleSidebar}>
          <HamburgerIcon />
        </span>
        <nav className="nav-links desktop">
          <NavLink
            activeClassName="active"
            className="nav-link"
            exact="true"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-link"
            exact="true"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/notes-app"
          >
            Notes
          </NavLink>
          <NavLink activeClassName="active" className="nav-link" to="/mail-app">
            Mail
          </NavLink>
        </nav>
      </section>
    </div>
  );
}
