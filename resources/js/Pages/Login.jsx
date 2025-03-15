import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";
import { useForm, Link } from "@inertiajs/react";
import "../../css/Login.css";
import useCanvasAnimation from "../hooks/useCanvasAnimation";
import { useAppContext } from "../contexts/AppContext";

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });
    const { APP_NAME } = useAppContext();
    // Canvas animation reference
    const canvasRef = useRef(null);
    useCanvasAnimation(canvasRef);

    const handleLogin = (e) => {
        e.preventDefault();
        post(route("post.login"));
    };

    return (
        <div className="login-screen d-flex flex-column justify-content-center align-items-center vh-100">
            {/* Animated background canvas */}
            <canvas ref={canvasRef} className="login-screen__canvas"></canvas>

            <div className="login-screen__content">
                <h1 className="login-screen__title mb-4">{APP_NAME}</h1>

                <div className="login-screen__card p-4">
                    <h2 className="mb-4 text-center">ログイン</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                className="form-control login-screen__input"
                                type="email"
                                placeholder="メールアドレスを入力"
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
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                パスワード
                            </label>
                            <input
                                id="password"
                                className="form-control login-screen__input"
                                type="password"
                                placeholder="パスワードを入力"
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
                        <button
                            type="submit"
                            className="login-screen__button w-100"
                            disabled={processing}
                        >
                            {processing ? "ログイン中..." : "ログイン"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <Link 
                            href={route("chat")} 
                            className="login-screen__skip-link"
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

export default Login;
