import React, { useState, useEffect } from "react";
import "../Layout.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { MdMenuBook } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { CiShop } from "react-icons/ci";
import { CgLogOut } from "react-icons/cg";
import { MdCloseFullscreen } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";
import { useSelector } from "react-redux";
import { set } from "mongoose";
import { Avatar, Badge } from "antd";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const [collapesed, setCollapesed] = useState(false);
  const navigate = useNavigate();
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
      name: "Apply",
      path: "/apply-staff",
      icon: <MdOutlineWork />,
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <HiMiniHome />,
    },
    {
      name: "users",
      path: "/users",
      icon: <FaUser />,
    },
    {
      name: "staff",
      path: "/staff",
      icon: <MdOutlineWork />,
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">CT</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i>{menu.icon}</i>
                  {!collapesed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i>
                <CgLogOut />
              </i>
              {!collapesed && <Link to="/logout">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapesed ? (
              <i
                className="header-action-icon"
                onClick={() => setCollapesed(false)}
              >
                <RiMenuUnfoldFill></RiMenuUnfoldFill>
              </i>
            ) : (
              <i
                className="header-action-icon"
                onClick={() => setCollapesed(true)}
              >
                <MdCloseFullscreen></MdCloseFullscreen>
              </i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge count={user?.unseenNotifs.length}>
                <i className="header-action-icon px-2">
                <IoIosNotificationsOutline/>
              </i>
              </Badge>
              
              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
