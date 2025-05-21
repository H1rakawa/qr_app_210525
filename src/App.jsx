// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPages';
import CreateQRPage from './pages/CreateQRPage';
import InvitationDetailsPage from './pages/InvitationDetailsPage';
import GuestInfoPage from './pages/GuestInfoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // CSS toàn cục

// Trang Tạo QR
// const CreateQRPage = () => (
//   <div style={{ padding: '50px', textAlign: 'center' }}>
//     <h1>Trang Tạo Mã QR</h1>
//     <p>Nội dung trang tạo mã QR sẽ ở đây.</p>
//     {/* Sử dụng Navigate để quay lại hoặc Link */}
//     <button onClick={() => window.history.back()}>Quay lại Dashboard</button>
//   </div>
// );

// Hàm giả lập kiểm tra xem người dùng đã đăng nhập chưa
const isAuthenticated = () => {
  // return !!localStorage.getItem('userToken'); // Ví dụ thực tế
  return true; // Tạm thời luôn cho là đã đăng nhập để test Dashboard
};

// Component PrivateRoute để bảo vệ route trong React Router v6
const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Người dùng chưa đăng nhập, điều hướng đến trang login
    // `replace` sẽ thay thế entry hiện tại trong history thay vì push một entry mới
    return <Navigate to="/login" replace />;
  }
  // Người dùng đã đăng nhập, render children (component được bảo vệ)
  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Route công khai */}
        <Route path="/login" element={<LoginPage />} />

        {/* Các Route riêng tư sử dụng PrivateRoute wrapper */}
        <Route
            path="/dashboard"
            element={
                <PrivateRoute>
                    <DashboardPage />
                </PrivateRoute>
            }
        />
        <Route
            path="/useSearchParams"
            element={
                <PrivateRoute>
                    <CreateQRPage />
                </PrivateRoute>
            }
        />

        <Route
            path='/create-qr?sub=edit&invite_id=19999'
            element={
                <PrivateRoute>
                    <CreateQRPage />
                </PrivateRoute>
            }
        />

        <Route
            path="/invitation-details"
            element={
                <PrivateRoute>
                    <InvitationDetailsPage />
                </PrivateRoute>
            } 
        />

        <Route
            path="/guest-info"
            element={
                <PrivateRoute>
                    <GuestInfoPage />
                </PrivateRoute>
            } 
        />

        {/* Route mặc định */}
        <Route
            path="/"
            element={
                isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
        />

        {/* (Tùy chọn) Route 404 Not Found */}
        <Route
          path="*"
          element={<div style={{ padding: 50, textAlign: 'center' }}><h1>404 - Trang không tồn tại</h1></div>}
        />
      </Routes>
    </Router>
  );
}

export default App;