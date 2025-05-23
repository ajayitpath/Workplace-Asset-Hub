import React from 'react';
import { Navigate } from 'react-router-dom';
import URLS from '../constants/urls';

const withAuth = (RenderComponent) => {
const WarppedComponent = (props) => {
    const token = localStorage.getItem('token');
    if (token){
        return <Navigate to={URLS.INITIAL} replace />;
    }
    return <RenderComponent {...props} />;

  };

  WarppedComponent.displayName = `withAuth(${RenderComponent.displayName || RenderComponent.name || 'Component'})`;
  return WarppedComponent;
}
export default withAuth;