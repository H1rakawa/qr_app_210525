// src/pages/DashboardPage.jsx
import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import Footer from '../components/Footer/Footer';

const DashboardPage = () => {

    return (
        <>
            <HeaderNav appName="Sự kiện Check-in" />
            
            <Dashboard />

            <Footer />
        </>
    );
};

export default DashboardPage;