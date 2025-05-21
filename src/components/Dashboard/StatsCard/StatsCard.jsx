// src/components/Dashboard/StatsCard/StatsCard.js
import React from 'react';
import './StatsCard.css';

// const StatsCard = ({ icon, title, value, iconColor }) => {
//   return (
//     <div className="stats-card">
//       <div className="stats-card-icon" style={{ color: iconColor || '#007bff' }}>
//         {icon}
//       </div>
//       <div className="stats-card-content">
//         <p className="stats-card-title">{title}</p>
//         <h3 className="stats-card-value">{value}</h3>
//       </div>
//     </div>
//   );
// };

const StatsCard = ({ icon, title, value, iconColor }) => {
  // Tạo một style object cho icon wrapper dựa trên iconColor
  // Thêm '20' vào cuối mã hex để tạo màu nhạt hơn với opacity (ví dụ #007bff20)
  // Hoặc bạn có thể định nghĩa các màu cố định trong CSS
  // const iconWrapperStyle = {
  //   backgroundColor: iconColor ? `${iconColor}33` : '#e7f3ff', // 33 là khoảng 20% opacity
  // };

  // Clone icon element để có thể truyền style trực tiếp vào nó
  const styledIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, { style: { color: iconColor || '#007bff' } })
    : null;

  return (
    <div className="stats-card">
      <div className="stats-card-header"> {/* Nhóm icon và title */}
        {/* <div className="stats-card-icon-wrapper" style={iconWrapperStyle}> */}
        <div className="stats-card-icon-wrapper">
          {styledIcon}
        </div>
        <p className="stats-card-title">{title}</p>
      </div>
      <h3 className="stats-card-value">{value}</h3>
    </div>
  );
};

export default StatsCard;