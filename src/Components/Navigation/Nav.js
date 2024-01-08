import React from 'react';
import Nav from './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navi = (props) => {
  const [isShow, setIsShow] = useState(true)
  let location = useLocation()
  useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }

  }, [])
    return (
      <>
      {isShow === true && 
        <div class="topnav">
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/project">Project</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      }
      </>
      
    );
}

export default Navi;