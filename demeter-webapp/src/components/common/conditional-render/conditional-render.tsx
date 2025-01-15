import React from "react";

export const ConditionalRender: React.FC<{
    isLoggedIn: boolean;
    loggedInContent: React.ReactNode;
    loggedOutContent: React.ReactNode;
}> = ({ isLoggedIn, loggedInContent, loggedOutContent}) => {
    return <>{isLoggedIn ? loggedInContent : loggedOutContent}</>;
}