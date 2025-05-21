// src/components/GuestInfo/GuestInfoPage.js
import React from 'react';
import GuestInfoCard from '../components/GuestInfoCard/GuestInfoCard';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import Footer from '../components/Footer/Footer';

// Dữ liệu mẫu (bạn sẽ lấy từ API hoặc props trong thực tế)
const sampleGuestData = {
    avatarUrl: 'https://i.pravatar.cc/150?img=32', // Placeholder avatar, thay bằng URL thực
    // guestNameLabel: 'Tên khách hàng',
    guestName: 'Nguyễn Thị Thanh',
    // phoneLabel: 'Số điện thoại',
    phoneNumber: '0912 345 678',
    // companyLabel: 'Tên công ty',
    companyName: 'Công ty TNHH ABC Việt Nam',
    // rewardLabel: 'Mã nhận thưởng',
    rewardCode: 'REWARD2024',
};

// Hàm xử lý khi click check-in
const handleCheckIn = () => {
    console.log(`Check-in cho khách hàng: ${sampleGuestData.guestName}`);
    alert(`Check-in thành công cho ${sampleGuestData.guestName}!`);
    // Tại đây có thể gọi API hoặc thực hiện các logic khác
};

const GuestInfoPage = () => {

    return (
      <div className="guest-info-page-container">
        <HeaderNav appName="Check-in Khách Hàng" />

        <main className="guest-info-main-content">
            <GuestInfoCard 
                avatarUrl={sampleGuestData.avatarUrl}
                guestName={sampleGuestData.guestName}
                phoneNumber={sampleGuestData.phoneNumber}
                companyName={sampleGuestData.companyName}
                rewardCode={sampleGuestData.rewardCode}
                onCheckIn={handleCheckIn} // Truyền hàm xử lý check-in
            />
        </main>

        <Footer />
      </div>
    );
};

export default GuestInfoPage;