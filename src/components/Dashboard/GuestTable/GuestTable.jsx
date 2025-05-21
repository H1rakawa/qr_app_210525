// src/components/Dashboard/GuestTable/GuestTable.js
import React from 'react';
import './GuestTable.css';
import { FaCheckCircle, FaExclamationCircle, FaEdit, FaTrashAlt, FaQrcode } from 'react-icons/fa';
// import defaultAvatar from '../../../assets/images/default-avatar.png'; // Đường dẫn đến avatar mặc định
import { NavLink } from 'react-router-dom';

const GuestTable = ({ guests, onEdit, onDelete, onAdd }) => {
  const getStatusClass = (status) => {
    return status === 'checked-in' ? 'status-checked-in' : 'status-pending';
  };

  const getStatusIcon = (status) => {
    return status === 'checked-in' ? <FaCheckCircle /> : <FaExclamationCircle />;
  };

  return (
    <div className="guest-table-container">
        <div className="table-header-controls">
            <h2>Danh sách khách mới</h2>
            
            <NavLink to="/invitation-details" className="nav-item" activeClassName="active">
                Tạo mã QR
            </NavLink>
        </div>

        <div className="table-wrapper">
            <table>
                <thead>
                  <tr>
                    <th>Tên event</th>
                    <th>Tên khách</th>
                    <th>Tên công ty</th>
                    <th>Số điện thoại</th>
                    <th>Mã nhận thưởng</th>
                    <th>Điểm danh</th>
                    <th>Tác vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                        Chưa có khách mời nào.
                      </td>
                    </tr>
                  ) : (
                    guests.map((guest) => (
                      <tr key={guest.id}>
                        <td>{guest.eventName}</td>
                        <td className="guest-name-cell">
                          <img
                            src={guest.avatar || `https://i.pravatar.cc/40?u=${guest.id}`} // Hoặc defaultAvatar
                            alt={guest.name}
                            className="avatar"
                          />
                          {guest.name}
                        </td>
                        <td>{guest.company}</td>
                        <td>{guest.phone}</td>
                        <td>{guest.rewardCode}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(guest.status)}`}>
                            {getStatusIcon(guest.status)}
                            {guest.status === 'checked-in' ? ' Đã check-in' : ' Chưa check-in'}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {/* <button
                            className="action-button edit-button"
                            onClick={() => onEdit(guest)}
                            title="Sửa thông tin"
                          >
                            <FaEdit /> Edit
                          </button> */}
                          <NavLink 
                              to="/useSearchParams"
                              className="action-button edit-button"
                              title="Sửa thông tin"
                              activeClassName="active"
                          >
                              <FaEdit /> Edit
                          </NavLink>

                          <button
                            className="action-button delete-button"
                            onClick={() => onDelete(guest.id, guest.name)}
                            title="Xóa thông tin"
                          >
                            <FaTrashAlt /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default GuestTable;