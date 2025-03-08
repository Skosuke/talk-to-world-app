import React from "react";
import AppHeader from "../components/AppHeader";

const AppLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            <main>{children}</main>
        </>
    );
};

export default AppLayout;
