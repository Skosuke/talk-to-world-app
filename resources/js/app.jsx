import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./Chat";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>
);
