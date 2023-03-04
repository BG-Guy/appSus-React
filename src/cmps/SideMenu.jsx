import React from "react";
import { Link } from "react-router-dom";

export default function SideMenu({ sidebar, toggleSidebar }) {
  return (
    <div
      className={
        sidebar
          ? "side-menu-container mobile-only"
          : "side-menu-container mobile-only open"
      }
    >
      <nav className="side-menu">
        <div className="header title">
          <h1>appSus</h1>
        </div>
        <button onClick={toggleSidebar} className="close-btn">
          X
        </button>
        <ul>
          <Link onClick={toggleSidebar} to={"/"} className="nav-link">
            Home
          </Link>
          <Link onClick={toggleSidebar} to={"/notes-app"} className="nav-link">
            Notes
          </Link>
          <Link onClick={toggleSidebar} to={"/mail-app"} className="nav-link">
            Emails
          </Link>
          <Link onClick={toggleSidebar} to={"/about"} className="nav-link">
            About
          </Link>
        </ul>
      </nav>
    </div>
  );
}
