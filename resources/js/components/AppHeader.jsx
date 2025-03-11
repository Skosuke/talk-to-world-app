import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import "../../css/AppHeader.css";

const AppHeader = ({ session = {} }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <header className="app-header shadow-lg">
            <div className="container d-flex justify-content-between align-items-center py-3">
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
                <nav>
                    {session.user ? (
                        <div className="d-flex align-items-center">
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
                                    user: <strong>{session.user.name}</strong>
                                </span>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="app-header__logout-btn ms-3"
                            >
                                logout
                            </Link>
                        </div>
                    ) : (
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
                    )}
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
