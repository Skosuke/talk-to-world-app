import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react";
import { useForm, Link } from "@inertiajs/react";
import "../../css/Register.css";
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
        <div className="register-screen d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Animated background canvas */}
            <canvas ref={canvasRef} className="register-screen__canvas"></canvas>

            <div className="register-screen__content">
                <h1 className="register-screen__title mb-4">Talk to World</h1>

                <div className="register-screen__card p-4">
                    <h2 className="mb-4 text-center">ユーザー登録</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                名前
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control register-screen__input"
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
                                className="form-control register-screen__input"
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
                                className="form-control register-screen__input"
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
                                className="form-control register-screen__input"
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
                            className="register-screen__button w-100"
                            disabled={processing}
                        >
                            {processing ? "登録中..." : "登録する"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <Link
                            href={route("login")}
                            className="register-screen__link me-3"
                            preserveState={false}
                            preserveScroll={false}
                        >
                            ログイン画面へ
                        </Link>
                        <Link 
                            href={route("chat")} 
                            className="register-screen__link"
                            preserveState={false}
                            preserveScroll={false}
                        >
                            ログインしないで利用
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
