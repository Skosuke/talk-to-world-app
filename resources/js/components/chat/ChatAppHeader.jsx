import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import "../../../css/AppHeader.css";

const ChatAppHeader = ({ session = {}, connectionStatus, leaveChat }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <header className="app-header shadow-lg">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                    <h1 className="fs-4 mb-0 fw-bold app-header__logo">
                        <Link
                            href={route("chat")}
                            className="text-white text-decoration-none"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            Talk To World
                        </Link>
                    </h1>
                    <div className="connection-status ms-3">
                        <div
                            className={`status-indicator ${
                                connectionStatus === "connecting"
                                    ? "connecting"
                                    : connectionStatus === "disconnected"
                                    ? "disconnected"
                                    : ""
                            }`}
                        />
                        <span className="ms-1 chat-status-text">
                            {connectionStatus === "connecting" && "接続中..."}
                            {connectionStatus === "reconnecting" &&
                                "再接続中..."}
                            {connectionStatus === "disconnected" && "切断済み"}
                            {connectionStatus === "connected" && "接続中"}
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    {session.user ? (
                        <>
                            <div
                                className={`app-header__user-badge ${
                                    isHovering
                                        ? "app-header__user-badge--hover"
                                        : ""
                                }`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <span>
                                    <strong>{session.user.name}</strong>
                                </span>
                            </div>
                            <div className="d-flex gap-2 ms-3">

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="app-header__logout-btn"
                                >
                                    logout
                                </Link>

                            </div>
                            <div className="d-flex gap-2 ms-3">
                            <button
                                    className="chat-exit-btn"
                                    onClick={leaveChat}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="me-1"
                                        width="16"
                                        height="16"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="9"
                                            y1="9"
                                            x2="15"
                                            y2="15"
                                        ></line>
                                        <line
                                            x1="15"
                                            y1="9"
                                            x2="9"
                                            y2="15"
                                        ></line>
                                    </svg>
                                    Exit Chat
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <ul className="d-flex list-unstyled gap-3 mb-0">
                                <li>
                                    <Link
                                        href={route("login")}
                                        className="app-header__nav-link"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("register")}
                                        className="app-header__nav-link"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        sign up
                                    </Link>
                                </li>
                            </ul>
                            <div className="ms-3">
                                <button
                                    className="chat-exit-btn"
                                    onClick={leaveChat}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="me-1"
                                        width="16"
                                        height="16"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="9"
                                            y1="9"
                                            x2="15"
                                            y2="15"
                                        ></line>
                                        <line
                                            x1="15"
                                            y1="9"
                                            x2="9"
                                            y2="15"
                                        ></line>
                                    </svg>
                                    Exit Chat
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default ChatAppHeader;
