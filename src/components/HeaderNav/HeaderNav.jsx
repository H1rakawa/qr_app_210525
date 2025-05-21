// src/components/Dashboard/HeaderNav/HeaderNav.js
import React from 'react';
import './HeaderNav.css';
import { FaThLarge, FaQrcode, FaSignOutAlt } from 'react-icons/fa'; // Ví dụ icon logo
import { NavLink } from 'react-router-dom'; // Nếu dùng React Router

const HeaderNav = ({ appName = "[Tên App]" }) => {
  const handleLogout = () => {
    // Logic đăng xuất
    console.log("Đăng xuất...");
    // Ví dụ: Chuyển về trang login
    // history.push('/login');
    alert("Đã đăng xuất!"); // Tạm thời
  };

  return (
    <header className="header-nav">
      <div className="logo-area">
        <FaThLarge className="app-logo-icon" />
        <span className="app-name">{appName}</span>
      </div>
      <nav className="navigation-links">
        {/* Sử dụng NavLink để có activeClassName */}
        <NavLink to="/dashboard" className="nav-item" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/guest-info" className="nav-item" activeClassName="active">
          Tạo mã QR
        </NavLink>
        {/* Hoặc dùng button nếu không phải là link route */}
        {/* <button className="nav-item">Tạo mã QR</button> */}
      </nav>
      <div className="user-actions">
        <button onClick={handleLogout} className="nav-item logout-button">
          <FaSignOutAlt /> Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderNav;