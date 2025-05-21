// src/pages/CreateQRPage.js
import React /* , { useState } // không cần useState nếu không còn currentStep */ from 'react';
import CreateQRForm from '../components/CreateQRForm/CreateQRForm';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import Footer from '../components/Footer/Footer';
// import { useNavigate } from 'react-router-dom'; // Cho react-router-dom v6

const CreateQRPage = () => {
//   const [currentStep, setCurrentStep] = useState(4); // Giả sử bước hiện tại là 4
//   const totalSteps = 5;
//   const navigate = useNavigate();

    const handleFinalSubmit = (formData) => {
        console.log("Dữ liệu cuối cùng từ form tạo QR:", formData);
        // Xử lý logic tạo QR code, lưu dữ liệu, ...
        alert("Đã gửi thông tin tạo QR!");
        // navigate('/dashboard'); // chuyển về dashboard
    };

    return (
        <div className="page-layout">
            {/* Header riêng biệt */}
            <header>
                <HeaderNav appName="Tạo Mã QR" />
            </header>
            
            {/* Nội dung chính */}
            <section className="page-content-area" style={{ marginTop: '20px' }}>
                <CreateQRForm onFormSubmit={handleFinalSubmit} />
            </section>

            <Footer />
        </div>
    );
};

export default CreateQRPage;
