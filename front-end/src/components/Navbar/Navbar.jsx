import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { navbarContents } from '../../constants';
import { logo, logout } from '../../assets/images/navbar-icons';

export const Navbar = () => {
  return (
    <nav>
      <img className="navbar-logo" src={logo} alt="VieAdven" />
      <div className="navbar-controller">
        {
          navbarContents.map(item => {
            return (
              <NavbarItem 
                key={item.id}
                {...item}
              />
            )
          })
        }
      </div>
      <NavbarItem
        className="navbar-logout"
        to="/logout"
        label="Đăng xuất"
        icon={logout}
      />
    </nav>
  )
}

const NavbarItem = ({ to, label, icon, className = "" }) => {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? `active-link navbar-item ${className}` : `navbar-item ${className}`}>
      <img src={icon} alt="" />
      <p>{label}</p>
    </NavLink>
  )
}