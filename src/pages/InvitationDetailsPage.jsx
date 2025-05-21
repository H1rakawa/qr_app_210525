import React from 'react';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import Footer from '../components/Footer/Footer';
import InvitationDetails from '../components/InvitationDetails/InvitationDetails';

const InvitationDetailsPage = () => {
    return (
        <>
            <HeaderNav appName="QR Checkin" />
            <InvitationDetails />
            <Footer />
        </>
    );
}

export default InvitationDetailsPage;