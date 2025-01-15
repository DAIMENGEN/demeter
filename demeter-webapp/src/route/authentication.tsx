import React from "react";
import {Navigate} from "react-router-dom";

export const Authentication: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/login-page"} replace></Navigate>
    }
}