import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Plus, QrCode, Zap } from 'lucide-react';
import './CreateQRForm.css';

const CreateQRForm = () => {
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    gender: 'Nam',
    companyName: '',
    phoneNumber: '',
    eventName: '',
    rewardCodes: []
  });

  const [currentCodeInput, setCurrentCodeInput] = useState('');

  const [generalSettings, setGeneralSettings] = useState({
    newEventName: '',
    numberOfItems: '', 
  });

  const [eventList, setEventList] = useState(['Sự kiện A (Mặc định)', 'Sự kiện B (Mặc định)']);

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneralSettingsChange = (field, value) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEventToList = () => {
    if (generalSettings.newEventName.trim() !== '' && !eventList.includes(generalSettings.newEventName.trim())) {
      setEventList(prevList => [...prevList, generalSettings.newEventName.trim()]);
      setGeneralSettings(prev => ({ ...prev, newEventName: '' }));
    } else if (eventList.includes(generalSettings.newEventName.trim())) {
      alert('Sự kiện này đã có trong danh sách!');
    }
  };

  const attemptAddRewardCode = (codeToAdd) => {
    if (!codeToAdd || codeToAdd.trim() === '') {
      alert('Mã nhận thưởng không được để trống.');
      return false;
    }
    const trimmedCode = codeToAdd.trim();
    const maxItems = parseInt(generalSettings.numberOfItems);

    if (isNaN(maxItems) || maxItems <= 0) {
      alert('Vui lòng nhập một "Số lượng" hợp lệ (lớn hơn 0) trong Thiết lập chung.');
      return false;
    }
    if (customerInfo.rewardCodes.length >= maxItems) {
      alert(`Đã đạt giới hạn ${maxItems} mã nhận thưởng theo Thiết lập chung.`);
      return false;
    }
    if (customerInfo.rewardCodes.includes(trimmedCode)) {
      alert('Mã này đã được thêm. Vui lòng nhập hoặc tạo mã khác.');
      return false;
    }
    setCustomerInfo(prev => ({
      ...prev,
      rewardCodes: [...prev.rewardCodes, trimmedCode]
    }));
    return true;
  };

  const handleAddManualCodeFromInput = () => {
    if (attemptAddRewardCode(currentCodeInput)) {
      setCurrentCodeInput(''); 
    }
  };

  const handleGenerateAndAddRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    attemptAddRewardCode(result);
  };

  const handleCreateQR = () => {
    if (!customerInfo.customerName || !customerInfo.phoneNumber || !customerInfo.eventName) {
      alert('Vui lòng điền đầy đủ thông tin khách mời (Tên, SĐT, Sự kiện).');
      return;
    }
    if (customerInfo.rewardCodes.length === 0) {
        alert('Vui lòng thêm ít nhất một mã nhận thưởng.');
        return;
    }
    const maxItems = parseInt(generalSettings.numberOfItems);
    if (isNaN(maxItems) || maxItems <= 0) {
      alert('Vui lòng nhập một "Số lượng" hợp lệ (lớn hơn 0) trong Thiết lập chung để xác định giới hạn mã.');
      return;
    }
    if (customerInfo.rewardCodes.length > maxItems) {
      alert(`Số lượng mã nhận thưởng (${customerInfo.rewardCodes.length}) vượt quá giới hạn đã đặt (${maxItems}). Vui lòng điều chỉnh.`);
      return;
    }
    const dataForQRCard = { ...customerInfo };
    navigate('/invitation-details', { state: { guestData: dataForQRCard } });
  };

  const maxItemsDisplay = parseInt(generalSettings.numberOfItems) > 0 ? generalSettings.numberOfItems : 'Chưa đặt SL';

  return (
    <div className="qr-form-container">
      {/* Customer Information Section */}
      <div className="form-section">
        <div className="section-header">
          <User className="header-icon" />
          <h2 className="section-title">Bổ xung thông tin</h2>
        </div>
        
        <div className="form-fields">
          <div className="form-group">
            <label className="field-label" htmlFor="customerName">Tên khách hàng</label>
            <input id="customerName" type="text" placeholder="Nhập tên khách hàng" className="form-input" value={customerInfo.customerName} onChange={(e) => handleCustomerInfoChange('customerName', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="field-label">Giới tính</label>
            <div className="radio-group">
              <label className="radio-item"><input type="radio" name="gender" value="Nam" checked={customerInfo.gender === 'Nam'} onChange={(e) => handleCustomerInfoChange('gender', e.target.value)} className="radio-input"/> Nam</label>
              <label className="radio-item"><input type="radio" name="gender" value="Nữ" checked={customerInfo.gender === 'Nữ'} onChange={(e) => handleCustomerInfoChange('gender', e.target.value)} className="radio-input"/> Nữ</label>
              <label className="radio-item"><input type="radio" name="gender" value="Khác" checked={customerInfo.gender === 'Khác'} onChange={(e) => handleCustomerInfoChange('gender', e.target.value)} className="radio-input"/> Khác</label>
            </div>
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="companyName">Tên công ty</label>
            <input id="companyName" type="text" placeholder="Nhập tên công ty" className="form-input" value={customerInfo.companyName} onChange={(e) => handleCustomerInfoChange('companyName', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="phoneNumber">Số điện thoại</label>
            <input id="phoneNumber" type="tel" placeholder="Nhập số điện thoại" className="form-input" value={customerInfo.phoneNumber} onChange={(e) => handleCustomerInfoChange('phoneNumber', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="field-label" htmlFor="eventNameSelect">Tên sự kiện</label>
            <select id="eventNameSelect" className="form-input" value={customerInfo.eventName} onChange={(e) => handleCustomerInfoChange('eventName', e.target.value)}>
              <option value="" disabled>-- Chọn sự kiện --</option>
              {eventList.map((event, index) => (<option key={index} value={event}>{event}</option>))}
            </select>
          </div>

          {/* Mã nhận thưởng section - Updated Layout */}
          <div className="form-group">
            <label className="field-label" htmlFor="currentCodeInput">
              Mã nhận thưởng (Tối đa: {maxItemsDisplay})
            </label>
            <div className="input-with-button"> {/* Bọc input và button "Tạo & Thêm Random" */}
              <input
                id="currentCodeInput"
                type="text"
                placeholder="Nhập mã rồi nhấn Enter"
                className="form-input flex-input" // Thêm lại flex-input
                value={currentCodeInput}
                onChange={(e) => setCurrentCodeInput(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddManualCodeFromInput(); }}}
              />
              <button
                type="button"
                onClick={handleGenerateAndAddRandomCode}
                className="generate-button" // Sử dụng class generate-button đã có
                // style đã được xóa (marginTop, width) vì sẽ được xử lý bằng flexbox
              >
                <Zap className="button-icon" />
                Tạo & Thêm Random
              </button>
            </div>
            
            {customerInfo.rewardCodes.length > 0 && (
              <div className="reward-codes-display">
                <strong>Các mã đã thêm ({customerInfo.rewardCodes.length}/{maxItemsDisplay}):</strong>
                <ul>
                  {customerInfo.rewardCodes.map((code, index) => (<li key={index}>{code}</li>))}
                </ul>
              </div>
            )}
          </div>

           <button type="button" className="submit-button" onClick={handleCreateQR} style={{marginTop: '16px'}}>
              <QrCode className="button-icon" /> Tạo mã QR
          </button>
        </div>
      </div>

      {/* Certificate Setup Section */}
      <div className="form-section">
        <div className="section-header">
          <Settings className="header-icon" />
          <h2 className="section-title">Thiết lập chung</h2>
        </div>
        <div className="form-fields">
          <div className="form-group">
            <label className="field-label" htmlFor="newEventNameInput">Nhập tên các sự kiện tạo thứ tự</label>
            <div className="input-with-button">
              <input id="newEventNameInput" type="text" placeholder="Thêm tên sự kiện" className="form-input flex-input" value={generalSettings.newEventName} onChange={(e) => handleGeneralSettingsChange('newEventName', e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddEventToList(); }}} />
              <button type="button" onClick={handleAddEventToList} className="add-button">
                <Plus className="button-icon" /> Thêm
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="field-label" htmlFor="numberOfItemsInput">Số lượng để bán (quyết định SL mã tối đa cho mỗi khách)</label>
            <input id="numberOfItemsInput" type="number" placeholder="Nhập số lượng mã tối đa" className="form-input quantity-input" value={generalSettings.numberOfItems} onChange={(e) => handleGeneralSettingsChange('numberOfItems', e.target.value)} min="1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQRForm;