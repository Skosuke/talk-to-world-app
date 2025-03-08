import React from "react";
import { Link } from "@inertiajs/react";

const AppHeader = ({ session = {} }) => {
    return (
        // ヘッダーは固定にせずレイアウト内に配置
        <header className="bg-primary bg-gradient text-white shadow-lg sticky-top">
            <div className="container d-flex justify-content-between align-items-center py-3">
                <h1 className="fs-4 mb-0 fw-bold">
                    <Link
                        href={route("chat")}
                        className="text-white text-decoration-none transition-opacity hover:opacity-75"
                    >
                        Talk To World
                    </Link>
                </h1>
                <nav>
                    {session.user ? (
                        <span className="small">
                            ログイン中: <strong>{session.user.name}</strong>
                        </span>
                    ) : (
                        <ul className="d-flex list-unstyled gap-3 mb-0">
                            <li>
                                <Link
                                    href={route("login")}
                                    className="text-white text-decoration-none small transition-opacity hover:opacity-75"
                                >
                                    login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("register")}
                                    className="text-white text-decoration-none small transition-opacity hover:opacity-75"
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
