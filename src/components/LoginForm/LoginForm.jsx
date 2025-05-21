// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';
import { FaLock, FaUser, FaKey, FaArrowRight } from 'react-icons/fa';

// Import toast và Swal
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Tùy chọn, để dùng JSX trong Swal

const MySwal = withReactContent(Swal); // Khởi tạo Swal với React content

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // --- Kịch bản 1: Validate dữ liệu nhập ---
    if (!username || !password) {
      toast.error("Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu!");
      // Hoặc dùng SweetAlert nếu muốn thông báo rõ ràng hơn
      // MySwal.fire({
      //   icon: 'warning',
      //   title: 'Thiếu thông tin',
      //   text: 'Bạn cần nhập cả Tên đăng nhập và Mật khẩu.',
      // });
      setIsLoading(false);
      return;
    }

    // Giả lập gọi API
    try {
      // Giả lập độ trễ mạng
      await new Promise(resolve => setTimeout(resolve, 1500));

      // --- Kịch bản 2: Đăng nhập thành công ---
      if (username === "admin" && password === "password") { // Logic đăng nhập mẫu
        toast.success("Đăng nhập thành công!"); // Thông báo nhanh

        // Hoặc thông báo chào mừng bằng SweetAlert
        MySwal.fire({
          icon: 'success',
          title: `Chào mừng, ${username}!`,
          text: 'Bạn đã đăng nhập thành công vào hệ thống.',
          timer: 2000, // Tự đóng sau 2s
          showConfirmButton: false,
        });
        // Reset form hoặc chuyển hướng
        setUsername('');
        setPassword('');
      }
      // --- Kịch bản 3: Sai thông tin đăng nhập ---
      else {
        toast.warn("Tên đăng nhập hoặc mật khẩu không chính xác.");
        // Hoặc dùng SweetAlert
        // MySwal.fire({
        //   icon: 'error',
        //   title: 'Đăng nhập thất bại',
        //   text: 'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!',
        // });
      }
    } catch (error) {
      // --- Kịch bản 4: Lỗi không xác định (ví dụ: lỗi mạng) ---
      console.error("Lỗi đăng nhập:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      // Hoặc dùng SweetAlert
      // MySwal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!',
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-icon-wrapper">
          <FaLock className="main-lock-icon" />
        </div>
        <h1 className="login-title">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading} // Vô hiệu hóa khi đang loading
              />
              <FaUser className="input-icon" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading} // Vô hiệu hóa khi đang loading
              />
              <FaKey className="input-icon" />
            </div>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : (
              <>
                Đăng nhập <FaArrowRight className="button-arrow-icon" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;