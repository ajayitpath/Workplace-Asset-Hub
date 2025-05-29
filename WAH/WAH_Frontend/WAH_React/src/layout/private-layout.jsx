import React from 'react';
import { Outlet } from 'react-router-dom';
import withUser from '../hoc/with-user';

const NewOutlet = withUser(Outlet);
const PrivateLayout = () => {
    return (
        <NewOutlet />
    );
}
export default PrivateLayout;