import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/"
          >
            <AiOutlineHome />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/connections"
          >
            <LiaUserFriendsSolid />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/profile"
          >
            <FaRegUserCircle />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/settings"
          >
            <FiSettings />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
