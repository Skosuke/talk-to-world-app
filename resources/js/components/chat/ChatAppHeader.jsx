import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import "../../../css/AppHeader.css";

const ChatAppHeader = ({ session = {}, connectionStatus, leaveChat }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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
                    <div className="connection-status ms-3 d-none d-sm-inline-flex">
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
                    {/* モバイル表示用のステータスインジケーター（テキストなし） */}
                    <div className="mobile-status-indicator d-inline-block d-sm-none ms-2">
                        <div
                            className={`status-indicator ${
                                connectionStatus === "connecting"
                                    ? "connecting"
                                    : connectionStatus === "disconnected"
                                    ? "disconnected"
                                    : ""
                            }`}
                        />
                    </div>
                </div>

                {/* ハンバーガーメニュー（モバイル用） */}
                <button 
                    className="mobile-menu-toggle d-sm-none" 
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    aria-label="メニューを開く"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                {/* デスクトップ用のメニュー */}
                <div className={`d-none d-sm-flex align-items-center`}>
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

                {/* モバイル用のメニュー（トグル可能） */}
                <div className={`mobile-menu ${showMobileMenu ? 'show' : ''}`}>
                    {session.user ? (
                        <>
                            <div className="mb-2 p-2 text-center mobile-user-badge">
                                <strong>{session.user.name}</strong>
                            </div>
                            <div className="d-flex flex-column">
                                <button
                                    className="mobile-menu-btn mb-2"
                                    onClick={leaveChat}
                                >
                                    Exit Chat
                                </button>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="mobile-menu-btn"
                                >
                                    Logout
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex flex-column">
                                <button
                                    className="mobile-menu-btn mb-2"
                                    onClick={leaveChat}
                                >
                                    Exit Chat
                                </button>
                                <Link
                                    href={route("login")}
                                    className="mobile-menu-btn mb-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="mobile-menu-btn"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default ChatAppHeader;
