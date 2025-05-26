import React from "react";
import { Navigate } from "react-router-dom";
import URLS from "../constants/urls";

const withUser = (RenderComponent) => {
    const WarppedComponent = (props) => {
        const token = localStorage.getItem("token");
        return token ? (
            <RenderComponent {...props} />
        ) : (
            <Navigate to={URLS.INITIAL} replace />
        );
    };

    WarppedComponent.displayName = `withUser(${
        RenderComponent.displayName || RenderComponent.name || "Component"
    })`;
    return WarppedComponent;
}
export default withUser;