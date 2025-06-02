import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useRoutes from '../hooks/use-route';
import AuthLayout from '../layout/auth-layout';
import PrivateLayout from '../layout/private-layout';


const Routing = () => {
  const { authRoutes, privateRoutes } = useRoutes();
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ id, element, path, ...otherData }) => (
         <Route key={id} path={path} element={element} {...otherData} />
              
        ))}
      </Route>

      {/* Private routes */}
      <Route element={<PrivateLayout />}>
        {privateRoutes.map(({ id, element, path, ...otherData }) => (
          <Route key={id} path={path} element={element} {...otherData} />
        ))}
      </Route>

      {/* 404 route */}
      <Route path="*" element={<p>404 | Not Found</p>} />
    </Routes>
  );
};
export default Routing;