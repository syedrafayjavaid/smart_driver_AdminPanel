
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/logo3.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";

  };
  return (
   <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper" style={{backgroundColor:"#D35400"}} >
        <div className="logo d-flex align-items-center justify-content-start" style={{borderBottom:"0px",left:"31px",bottom:"17px"}}>
          <a
            href="http://localhost:3000/admin/dashboard"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              {/* <img
                src={logo}
                alt="logo no available"
              /> */}
           
      
            
              
            </div>
          
          </a>
        </div>
        <Nav style={{marginTop:""}}>
          {routes.map((prop, key) => {
            {/* console.log("props", prop) */}
            if (prop.name && !prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
