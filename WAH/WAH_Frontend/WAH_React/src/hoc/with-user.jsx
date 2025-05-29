// import React from "react";
// import { Navigate } from "react-router-dom";
// import URLS from "../constants/urls";

// const withUser = (RenderComponent) => {
//     const WarppedComponent = (props) => {
//         const token = localStorage.getItem("token");
//         return token ? (
//             <RenderComponent {...props} />
//         ) : (
//             <Navigate to={URLS.INITIAL} replace />
//         );
//     };

//     WarppedComponent.displayName = `withUser(${
//         RenderComponent.displayName || RenderComponent.name || "Component"
//     })`;
//     return WarppedComponent;
// }
// export default withUser;

import React from 'react';
import { Navigate } from 'react-router-dom';
import URLS from '../constants/urls';
import { isAuthenticated } from '../utils/auth';

const withUser = (RenderComponent) => {
  const WrappedComponent = (props) => {
    return isAuthenticated() ? (
      <RenderComponent {...props} />
    ) : (
      <Navigate to={URLS.INITIAL} replace />
    );
  };

  WrappedComponent.displayName = `withUser(${RenderComponent.displayName || RenderComponent.name || 'Component'})`;
  return WrappedComponent;
};

export default withUser;
