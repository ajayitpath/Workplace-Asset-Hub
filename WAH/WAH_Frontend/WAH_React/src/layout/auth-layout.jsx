import React from 'react';
import { Outlet } from 'react-router-dom';
import withAuth from '../hoc/with-auth';
import Header from '../components/Header/Header';

const NewOutlet = withAuth(Outlet);
const AuthLayout = () => {
    return (
        <>
        <Header/>
        <NewOutlet />
        </>
    );
}
export default AuthLayout;