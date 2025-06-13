
import React from 'react';
import { Navigate } from 'react-router-dom';
import URLS from '../constants/urls';
import { isAuthenticated } from '../utils/auth';

const withAuth = (RenderComponent) => {
  const WrappedComponent = (props) => {
    return isAuthenticated() ? (
      <Navigate to={URLS.INITIAL} replace />
    ) : (
      <RenderComponent {...props} />
    );
  };

  WrappedComponent.displayName = `withAuth(${RenderComponent.displayName || RenderComponent.name || 'Component'})`;
  return WrappedComponent;
};

export default withAuth;
