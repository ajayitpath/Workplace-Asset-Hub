import React from 'react';
import { Outlet } from 'react-router-dom';
import withUser from '../hoc/with-user';

const NewOutlet = withUser(Outlet);
const AuthLayout = () => {
    return (
        <NewOutlet />
    );
}
export default AuthLayout;