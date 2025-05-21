import React, { useRef } from 'react';
import { Mail, HelpCircle, UserCircle, Phone, Building2, Gift, Share2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './InvitationDetails.css';

const invitationData = {
  guestName: 'Nguyễn Văn A',
  phoneNumber: '0912 345 678',
  companyName: 'Công ty ABC',
  rewardCode: '#ABCD2024',
  qrCodeUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'
};

const InvitationDetailsCard = ({ data }) => {
  const qrImageRef = useRef(null);

  const downloadImage = async (imageUrl, filename = 'qr-code.png') => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Không thể tải hình ảnh: ${response.statusText}`);
      }
      const blob = await response.blob();

      // Tạo URL đối tượng từ Blob
      const url = URL.createObjectURL(blob);

      // Tạo một thẻ <a> ẩn để kích hoạt tải xuống
      const anchorElement = document.createElement('a');
      anchorElement.href = url;
      anchorElement.download = filename; // Tên file khi tải về

      document.body.appendChild(anchorElement); // Cần thêm vào DOM để click hoạt động trên Firefox
      anchorElement.click();
      document.body.removeChild(anchorElement); // Xóa khỏi DOM sau khi click

      // Thu hồi URL đối tượng để giải phóng bộ nhớ
      URL.revokeObjectURL(url);

      toast.success('Đã bắt đầu tải hình ảnh QR!');

    } catch (error) {
      toast.error('Lỗi khi tải hình ảnh: ' + error.message);
      console.error('Lỗi khi tải hình ảnh:', error);
    }
  };

  const handleShareQRCode = async () => {
    if (!data.qrCodeUrl) {
        toast.error('Không có URL mã QR để xử lý.');
        return;
    }

    // Ưu tiên copy nếu được hỗ trợ
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        const response = await fetch(data.qrCodeUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const imageBlob = await response.blob();

        // Xác định đúng MIME type cho ClipboardItem, ưu tiên image/png
        let clipboardBlobType = imageBlob.type;
        if (imageBlob.type === 'image/svg+xml') {
          // Với SVG, trình duyệt có thể không copy trực tiếp dưới dạng hình ảnh.
          // Để demo, chúng ta vẫn thử, nhưng giải pháp tốt hơn là chuyển SVG sang PNG.
          // Hoặc bạn có thể copy SVG dưới dạng text/plain nếu muốn.
          // clipboardBlobType = 'image/svg+xml'; // Một số trình duyệt có thể hỗ trợ
          console.warn("Đang thử copy SVG, có thể không hoạt động như mong đợi trên tất cả trình duyệt. Chuyển sang PNG để có kết quả tốt nhất.");
        } else if (!clipboardBlobType.startsWith('image/')) {
            // Nếu không phải image, hoặc SVG không được hỗ trợ, thì fallback download
            toast.info('Không thể copy định dạng này, đang thử tải xuống...');
            await downloadImage(data.qrCodeUrl, `${data.guestName || 'guest'}-qr.png`);
            return;
        }
        

        const clipboardItem = new ClipboardItem({ [clipboardBlobType]: imageBlob });
        await navigator.clipboard.write([clipboardItem]);
        toast.success('Đã copy hình ảnh mã QR vào clipboard!');
        return; // Copy thành công, không cần làm gì thêm

      } catch (error) {
        toast.warn('Không thể copy hình ảnh vào clipboard. Đang thử tải xuống...');
        console.error('Lỗi khi copy mã QR (sẽ thử download):', error);
        // Nếu copy thất bại, sẽ chuyển sang download bên dưới
      }
    } else {
      toast.info('Trình duyệt không hỗ trợ copy hình ảnh. Đang thử tải xuống...');
    }

    // Fallback: Tải hình ảnh xuống nếu copy không được hỗ trợ hoặc thất bại
    // Đặt tên file dựa trên tên khách mời nếu có
    const filename = `${data.guestName ? data.guestName.replace(/\s+/g, '_') : 'khach_moi'}-qr.png`;
    await downloadImage(data.qrCodeUrl, filename);
  };

  return (
    <div className="invitation-details-card">
      <h2 className="card-title">Chi tiết lời mời</h2>
      <div className="qr-code-section">
        <img
          ref={qrImageRef}
          src={data.qrCodeUrl}
          alt="Mã QR"
          className="qr-code-image"
          crossOrigin="anonymous"
        />
        <p className="qr-code-caption">Mã QR dành cho khách mời</p>
      </div>
      <div className="guest-info-section">
        <div className="info-item">
          <UserCircle size={16} className="info-icon" />
          <span className="info-label">Tên:</span>
          <span className="info-value">{data.guestName}</span>
        </div>
        <div className="info-item">
          <Phone size={16} className="info-icon" />
          <span className="info-label">Số điện thoại:</span>
          <span className="info-value">{data.phoneNumber}</span>
        </div>
        <div className="info-item">
          <Building2 size={16} className="info-icon" />
          <span className="info-label">Tên công ty:</span>
          <span className="info-value">{data.companyName}</span>
        </div>
        <div className="info-item">
          <Gift size={16} className="info-icon" />
          <span className="info-label">Mã nhận thưởng:</span>
          <span className="info-value reward-value">{data.rewardCode}</span>
        </div>
      </div>
      <div className="action-buttons-section">
        <button
          className="primary-button share-qr-button"
          onClick={handleShareQRCode}
        >
          <Share2 size={16} strokeWidth={2} style={{ marginRight: '8px' }} />
          Chia sẻ mã QR
        </button>
        <button className="secondary-link-button invite-another-button">
          Mời khách khác
        </button>
      </div>
    </div>
  );
};

const InvitationDetails = () => {
  return (
    <div className="invitation-page-container">
      <main className="invitation-main-content">
        <InvitationDetailsCard data={invitationData} />
      </main>
    </div>
  );
};

export default InvitationDetails;