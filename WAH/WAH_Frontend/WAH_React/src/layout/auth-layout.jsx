import React from 'react';
import { Outlet } from 'react-router-dom';
import withAuth from '../hoc/with-auth';

const NewOutlet = withAuth(Outlet);
const AuthLayout = () => {
    return (
        <NewOutlet />
    );
}
export default AuthLayout;