import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

// Import SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './GuestInfoCard.css'; // File CSS cho component này
import { FaPhoneAlt, FaBuilding, FaGift, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

// Định nghĩa kiểu dữ liệu cho props (tùy chọn nhưng tốt cho việc kiểm tra)
import PropTypes from 'prop-types';


const MySwal = withReactContent(Swal);// Tạo một instance có thể dùng với React content nếu cần

const handleInputAlert = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Check-in Thành Công",
        showConfirmButton: false,
        timer: 1500
    });
};

// Nhân thông tin chuyển trang từ CreateQRForm
const GuestInfoCardPage = () => {
  const location = useLocation();
  const guestDataFromState = location.state?.guestData; // Lấy guestData từ state
  // const settingsFromState = location.state?.settings; // Lấy settings nếu bạn có truyền

  useEffect(() => {
    if (guestDataFromState) {
      console.log('Dữ liệu khách mời nhận được:', guestDataFromState);
      // console.log('Thiết lập nhận được:', settingsFromState);

      // Tại đây bạn có thể sử dụng guestDataFromState để hiển thị thông tin
      // hoặc tạo mã QR dựa trên thông tin này.
    } else {
      console.log('Không có dữ liệu khách mời được truyền đến.');
      // Có thể xử lý trường hợp không có dữ liệu, ví dụ: điều hướng về trang trước
    }
  }, [guestDataFromState]); // Chạy effect khi guestDataFromState thay đổi

  if (!guestDataFromState) {
    return (
        <div>
            <h2>Lỗi</h2>
            <p>Không có thông tin khách mời để hiển thị. Vui lòng quay lại và thử tạo lại.</p>
            {/* Thêm nút quay lại nếu muốn */}
        </div>
    );

  }
}

const GuestInfoCard = (props) => {

    console.log("Props nhận được trong GuestInfoCard:", props);

    // Destructure props để dễ sử dụng
    const {
        avatarUrl,
        guestName,
        phoneNumber,
        companyName,
        rewardCode,
        onCheckIn, // Hàm xử lý khi click check-in
    } = props;

    // Hàm xử lý khi bấm nút Check-in
    const handleCheckInClick = () => {
        MySwal.fire({
            title: 'Xác nhận check-in?',
            text: `Bạn có chắc chắn muốn check-in cho khách hàng "${guestName}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                onCheckIn();
                MySwal.fire('Thành công!', `Đã check-in cho ${guestName}.`, 'success');
            }
        });
    };

    return (
        <div className='guest-card-component'>
            <div className="guest-card">
                <div className="guest-card__avatar-section">
                    <img
                        src={avatarUrl || 'https://via.placeholder.com/100'} // Ảnh placeholder nếu không có avatarUrl
                        alt={guestName}
                        className="guest-card__avatar-img"
                    />

                    <p className="guest-card__label">Tên khách hàng</p>
                    <h2 className="guest-card__name">{guestName}</h2>
                </div>

                <div className="guest-card__details-section">
                    <div className="guest-card__detail-item">
                        <FaPhoneAlt className="customer-card__icon" />
                        <div>
                            <p className="guest-card__label">Số điện thoại</p>
                            <p className="guest-card__value">{phoneNumber}</p>
                        </div>
                    </div>

                    <div className="guest-card__detail-item">
                        <FaBuilding className="guest-card__icon" />
                        <div>
                            <p className="guest-card__label">Tên công ty</p>
                            <p className="guest-card__value">{companyName}</p>
                        </div>
                    </div>

                    <div className="guest-card__detail-item">
                        <FaGift className="guest-card__icon" />
                        <div>
                          <p className="guest-card__label">Mã nhận thưởng</p>
                          <p className="guest-card__value guest-card__reward-code">
                            {rewardCode}
                          </p>
                        </div>
                    </div>
                </div>

                <button className="guest-card__checkin-button" onClick={handleInputAlert}>
                  <FaMapMarkerAlt className="guest-card__button-icon" />
                  Check-in
                </button>
            </div>
        </div>
    );
};



GuestInfoCard.propTypes = {
  avatarUrl: PropTypes.string,
  guestName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  rewardCode: PropTypes.string.isRequired,
  onCheckIn: PropTypes.func.isRequired,
};

// Giá trị mặc định cho props (tùy chọn)
GuestInfoCard.defaultProps = {
  avatarUrl: 'https://via.placeholder.com/100?text=Avatar', // Ảnh mặc định
};


export default GuestInfoCard;