// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';
import HeaderNav from '../HeaderNav/HeaderNav';
import StatsCard from './StatsCard/StatsCard';
import GuestTable from './GuestTable/GuestTable';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Icons
import { FaUsers, FaUserCheck, FaUserClock } from 'react-icons/fa';

const MySwal = withReactContent(Swal);

// Dữ liệu mẫu ban đầu
const initialGuestsData = [
    { id: 'g1', eventName: 'Gala 2024', avatar: '', name: 'Nguyễn Văn A', company: 'ABC Corp', phone: '0901234567', rewardCode: 'REW12345', status: 'checked-in' },
    { id: 'g2', eventName: 'Gala 2024', avatar: '', name: 'Trần Thị B', company: 'XYZ Ltd', phone: '0912345678', rewardCode: 'REW67890', status: 'pending' },
    { id: 'g3', eventName: 'Gala 2024', avatar: '', name: 'Lê Minh C', company: 'MNO Group', phone: '0987654321', rewardCode: 'REW24680', status: 'checked-in' },
];

const Dashboard = () => {
    const [guests, setGuests] = useState(initialGuestsData);
    const [stats, setStats] = useState({ total: 0, checkedIn: 0, pending: 0 });
    // const [showModal, setShowModal] = useState(false); // Cho Add/Edit Modal
    // const [editingGuest, setEditingGuest] = useState(nullx); // Khách đang được sửa

    // Tính toán số liệu thống kê
    useEffect(() => {
        const total = guests.length;
        const checkedIn = guests.filter(g => g.status === 'checked-in').length;
        const pending = total - checkedIn;
        setStats({ total, checkedIn, pending });
    }, [guests]);

    // --- CRUD Functions ---

    // Hàm tạo ID duy nhất đơn giản (trong thực tế nên dùng UUID)
    const generateId = () => `g${new Date().getTime()}`;

    // CREATE: Mở form/modal để thêm khách mới
    // const handleAddGuest = useCallback(() => {
    //     MySwal.fire({
    //         title: 'Thêm khách mời mới',
    //         html: `
    //             <div></div>
    //             <input id="swal-name" class="swal2-input" placeholder="Tên khách">
    //             <input id="swal-company" class="swal2-input" placeholder="Tên công ty">
    //             <input id="swal-phone" class="swal2-input" placeholder="Số điện thoại">
    //             <input id="swal-event" class="swal2-input" placeholder="Tên sự kiện" value="Gala 2024">
    //         `,
    //         confirmButtonText: 'Thêm khách',
    //         focusConfirm: false,
    //         showCancelButton: true,
    //         cancelButtonText: 'Hủy',
    //         preConfirm: () => {
    //             const name = document.getElementById('swal-name').value;
    //             const company = document.getElementById('swal-company').value;
    //             const phone = document.getElementById('swal-phone').value;
    //             const eventName = document.getElementById('swal-event').value;
    //             if (!name || !company) {
    //                 Swal.showValidationMessage(`Tên khách và Tên công ty là bắt buộc`);
    //                 return false;
    //             }
    //             return { name, company, phone, eventName };
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             const newGuest = {
    //                 id: generateId(),
    //                 eventName: result.value.eventName,
    //                 avatar: '', // Có thể cho phép upload hoặc để trống
    //                 name: result.value.name,
    //                 company: result.value.company,
    //                 phone: result.value.phone,
    //                 rewardCode: `REW${Math.floor(Math.random() * 90000) + 10000}`,
    //                 status: 'pending' // Mặc định là chưa check-in
    //             };
    //             setGuests(prevGuests => [newGuest, ...prevGuests]); // Thêm vào đầu danh sách
    //             toast.success(`Đã thêm khách mời: ${newGuest.name}`);
    //         }
    //     });
    // }, []);


    // UPDATE: Mở form/modal để sửa thông tin khách
    // const handleEditGuest = useCallback((guestToEdit) => {
    //     MySwal.fire({
    //         title: `Sửa thông tin: ${guestToEdit.name}`,
    //         html: `
    //             <div class="swal-form-group">
    //                 <label for="swal-name" class="swal2-label">Họ và tên</label>
    //                 <input id="swal-edit-name" class="swal2-input" value="${guestToEdit.name}">
    //             </div>

    //              <div class="swal-form-group">
    //                 <label for="swal-phone" class="swal2-label">Tên công ty</label>
    //                 <input id="swal-edit-company" class="swal2-input" value="${guestToEdit.company}">
    //              </div>

    //              <div class="swal-form-group">
    //                 <label for="swal-phone" class="swal2-label">Số điện thoại</label>
    //                 <input id="swal-edit-phone" class="swal2-input" value="${guestToEdit.phone}">
    //              </div>

    //              <div class="swal-form-group">
    //                 <input id="swal-edit-event" class="swal2-input" value="${guestToEdit.eventName}">
    //              </div>

    //             <select id="swal-edit-status" class="swal2-input">
    //                 <option value="pending" ${guestToEdit.status === 'pending' ? 'selected' : ''}>Chưa check-in</option>
    //                 <option value="checked-in" ${guestToEdit.status === 'checked-in' ? 'selected' : ''}>Đã check-in</option>
    //             </select>
    //         `,
    //         confirmButtonText: 'Lưu thay đổi',
    //         focusConfirm: false,
    //         showCancelButton: true,
    //         cancelButtonText: 'Hủy',
    //         preConfirm: () => {
    //             const name = document.getElementById('swal-edit-name').value;
    //             const company = document.getElementById('swal-edit-company').value;
    //             const phone = document.getElementById('swal-edit-phone').value;
    //             const eventName = document.getElementById('swal-edit-event').value;
    //             const status = document.getElementById('swal-edit-status').value;

    //             if (!name || !company) {
    //                 Swal.showValidationMessage(`Tên khách và Tên công ty là bắt buộc`);
    //                 return false;
    //             }
    //             return { name, company, phone, eventName, status };
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setGuests(prevGuests =>
    //                 prevGuests.map(g =>
    //                     g.id === guestToEdit.id ? { ...g, ...result.value } : g
    //                 )
    //             );
    //             toast.info(`Đã cập nhật thông tin cho: ${result.value.name}`);
    //         }
    //     });
    // }, []);

    // DELETE: Xóa khách
    const handleDeleteGuest = useCallback((guestId, guestName) => {
        MySwal.fire({
            title: 'Bạn chắc chắn?',
            html: `Bạn có muốn xóa khách mời "<strong>${guestName}</strong>" không? Hành động này không thể hoàn tác.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có, xóa ngay!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                setGuests(prevGuests => prevGuests.filter(g => g.id !== guestId));
                toast.error(`Đã xóa khách mời: ${guestName}`);
            }
        });
    }, []);


    return (
      <div className="dashboard-layout">
        <main className="dashboard-main-content">
            <section className="stats-grid">
                <StatsCard
                    icon={<FaUsers size={18} />}
                    title="Tổng khách mời"
                    value={stats.total}
                    iconColor="#007bff"
                />
                <StatsCard
                    icon={<FaUserCheck size={18} />}
                    title="Số lượng đã check-in"
                    value={stats.checkedIn}
                    iconColor="#28a745"
                />
                <StatsCard
                    icon={<FaUserClock size={18} />}
                    title="Khách chưa check-in"
                    value={stats.pending}
                    iconColor="#ffc107"
                />
            </section>

            <GuestTable
                guests={guests}
                // onAdd={handleAddGuest}
                // onEdit={handleEditGuest}
                onDelete={handleDeleteGuest}
            />
        </main>
      </div>
    );
};

export default Dashboard;