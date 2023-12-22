import React, { useState, useEffect } from "react";
import "../Layout.css";
import { Link, useLocation } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { MdMenuBook } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import { CgLogOut } from "react-icons/cg";
import { MdCloseFullscreen } from "react-icons/md";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState();
  const handleToggleCollapse = () => {
    if (collapsed) {
      setCollapsed(true);
    } else {
      setCollapsed(true);
    }
  };
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HiMiniHome />,
    },
    {
      name: "Menu",
      path: "/menu",
      icon: <MdMenuBook />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaListUl />,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: <CiShop />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <CgLogOut />,
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">CT</h1>
          </div>

          <button onClick={handleToggleCollapse}>
            {collapsed ? <RiMenuUnfoldFill /> : <MdCloseFullscreen />}
          </button>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={index}
                >
                  {!collapsed ? (
                    <>
                      <i>{menu.icon}</i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </>
                  ) : (
                    <Link to={menu.path}>
                      <i>{menu.icon}</i>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="d-flex">
              <i className="header-action-icon">
                <IoIosNotificationsOutline />
              </i>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
