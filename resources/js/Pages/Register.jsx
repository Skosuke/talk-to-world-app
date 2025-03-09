import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import "../../css/Login.css";
import useCanvasAnimation from "../hooks/useCanvasAnimation";

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Canvas animation reference
    const canvasRef = useRef(null);
    useCanvasAnimation(canvasRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("post.register"));
    };

    return (
        <div className="login-screen d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Animated background canvas */}
            <canvas ref={canvasRef} className="login-screen__canvas"></canvas>

            <div className="login-screen__content">
                <h1 className="login-screen__title mb-4">Talk to World</h1>

                <div className="login-screen__card p-4">
                    <h2 className="mb-4 text-center">ユーザー登録</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                名前
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control login-screen__input"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-danger mt-1">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-control login-screen__input"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="text-danger mt-1">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                パスワード
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="form-control login-screen__input"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <div className="text-danger mt-1">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password_confirmation"
                                className="form-label"
                            >
                                パスワード確認
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                className="form-control login-screen__input"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.password_confirmation && (
                                <div className="text-danger mt-1">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="login-screen__button w-100"
                            disabled={processing}
                        >
                            {processing ? "登録中..." : "登録する"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <a
                            href="/login"
                            className="login-screen__skip-link me-3"
                        >
                            ログイン画面へ
                        </a>
                        <a href="/chat" className="login-screen__skip-link">
                            ログインしないで利用
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
