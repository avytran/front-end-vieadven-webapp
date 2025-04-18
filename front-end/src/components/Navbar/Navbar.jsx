import React from 'react';
import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { navbarContents } from '../../constants';
import { logo } from '../../assets/images/navbar-icons';

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
    </nav>
  )
}

const NavbarItem = ({ to, label, icon }) => {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'active-link navbar-item' : 'navbar-item'}>
      <img src={icon} alt="" />
      <p>{label}</p>
    </NavLink>
  )
}