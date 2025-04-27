import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { navbarContents } from '../../constants';
import { logo, logoutIcon } from '../../assets/images/navbar-icons';
import { useAuth } from '../../context/useAuth';

export const Navbar = () => {
  const { logout } = useAuth();
  
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
      <div className="navbar-logout" onClick={logout}>
        <NavbarItem
          to="/login"
          label="Đăng xuất"
          icon={logoutIcon}
        />
      </div>
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